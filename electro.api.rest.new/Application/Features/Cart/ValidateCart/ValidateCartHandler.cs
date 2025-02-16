using Domain.Reposiotories;
using Domain.Aggregates.CartAggregate;
using Domain.ValueObjects;
using Application.Services.UserContext;
using MediatR;


namespace Application.Features.Cart.ValidateAndSaveCart
{
    public class ValidateCartHandler : IRequestHandler<ValidateCartCommand, ValidateCartResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;

        public ValidateCartHandler(IUnitOfWork unitOfWork, IUserContext userContext)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
        }

        public async Task<ValidateCartResult> Handle(ValidateCartCommand command, CancellationToken cancellationToken)
        {
            var validationResult = await ValidateCartAsync(command, cancellationToken);
            if (_userContext.IsAuthenticated)
            {
                var userId = _userContext.UserId;
                await SaveCartAsync(userId, validationResult, cancellationToken);
            }

            return validationResult;
        }

        private async Task<ValidateCartResult> ValidateCartAsync(ValidateCartCommand command, CancellationToken cancellationToken)
        {
            var resultProducts = new List<ValidateCartResultProduct>();
            var errors = new List<string>();
            decimal totalPrice = 0;
            int totalQuantity = 0;

            foreach (var productCommand in command.Products)
            {
                var product = await _unitOfWork.ProductRepository.GetByIdAsync(productCommand.ProductId);

                if (product == null)
                {
                    errors.Add($"Product with ID {productCommand.ProductId} does not exist.");
                    continue;
                }

                if (product.StockQuantity < productCommand.Quantity)
                {
                    errors.Add($"Insufficient stock for product {product.Name}.");
                    productCommand.Quantity = product.StockQuantity;
                }

                if (productCommand.Quantity <= 0)
                {
                    continue;
                }

                if (!resultProducts.Any(p => p.ProductId == product.Id))
                {
                    resultProducts.Add(new ValidateCartResultProduct
                    {
                        ProductId = product.Id,
                        Quantity = productCommand.Quantity,
                        Price = new Money(product.Price.Amount, product.Price.Currency),
                        Name = product.Name,
                        Photo = product.Photos.FirstOrDefault()
                    });
                }

                var productTotalPrice = productCommand.Quantity * product.Price.Amount;
                totalPrice += productTotalPrice;
                totalQuantity += productCommand.Quantity;
            }

            return new ValidateCartResult
            {
                Id = null,
                TotalQuantity = totalQuantity,
                TotalPrice = new Money(totalPrice, "PLN"),
                Products = resultProducts,
                Errors = errors
            };
        }

        private async Task SaveCartAsync(Guid userId, ValidateCartResult validationResult, CancellationToken cancellationToken)
        {
            var existingCart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(userId);

            if (existingCart == null)
            {
                existingCart = new Domain.Aggregates.CartAggregate.Cart(userId);
                _unitOfWork.CartRepository.AddCart(existingCart);
            }

            var existingProductIds = existingCart.Products.Select(p => p.ProductId).ToList();
            var validatedProductIds = validationResult.Products.Select(p => p.ProductId).ToList();

            foreach (var existingProduct in existingCart.Products.ToList())
            {
                if (!validatedProductIds.Contains(existingProduct.ProductId))
                {
                    existingCart.RemoveItem(existingProduct.ProductId);
                }
            }

            foreach (var validatedProduct in validationResult.Products)
            {
                var cartProduct = existingCart.Products.FirstOrDefault(p => p.ProductId == validatedProduct.ProductId);

                if (cartProduct != null)
                {
                    cartProduct.UpdateQuantity(validatedProduct.Quantity);
                    cartProduct.UpdatePrice(validatedProduct.Price);
                }
                else
                {
                    var newCartProduct = new CartProduct(
                        existingCart.Id,
                        validatedProduct.ProductId,
                        validatedProduct.Quantity,
                        validatedProduct.Price
                    );
                    existingCart.AddOrUpdateItem(newCartProduct);
                }
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            validationResult.Id = existingCart.Id;
        }
    }
}
