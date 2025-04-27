using Application.Exceptions;
using Application.Services.Models;
using Domain.Aggregates.CartAggregate;
using Domain.Aggregates.UserAggregate;
using Domain.Reposiotories;

namespace Application.Services.CartService
{
    public class CartService : ICartService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CartService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Cart> GetCartByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var userCart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(userId, cancellationToken);

            if (userCart == null)
            {
                userCart = Cart.Create(userId);

                await _unitOfWork.CartRepository.AddCartAsync(userCart, cancellationToken);

                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }

            foreach (var cartProduct in userCart.Products)
            {
                if (cartProduct.Product == null)
                {
                    continue;
                }

                if (!cartProduct.Product.IsAvailableToBuy)
                {
                    userCart.RemoveItem(cartProduct.Product.Id);
                }
                else
                {
                    var unitPrice = cartProduct.Product.EffectivePrice;
                    cartProduct.UpdateUnitPrice(unitPrice);
                }
            }
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return userCart;
        }

        public async Task<List<Recipient>> GetUserRecipientsByUserIdAsync(Guid userId, CancellationToken cancellationToken)
        {
            var recipients = await _unitOfWork.RecipientRepository.GetUserRecipientsAsync(userId, cancellationToken);

            return recipients.ToList();
        }

        public async Task<(Cart cart, List<string> errors)> ValidateAndSaveCartAsync(Guid? userId, List<ValidateCartProductModel> model, CancellationToken cancellationToken)
        {
            var resultProducts = new List<CartProduct>();
            var errors = new List<string>();
            var products = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(model.Select(vcp => vcp.ProductId));
            Cart cart = null;

            foreach (var productModel in model)
            {
                var product = products.FirstOrDefault(p => p.Id == productModel.ProductId);

                if (product == null)
                {
                    errors.Add($"Product with ID {productModel.ProductId} does not exist.");
                    continue;
                }

                if (product.StockQuantity < productModel.Quantity)
                {
                    errors.Add($"Insufficient stock for product {product.Name}.");
                    productModel.Quantity = product.StockQuantity;
                }

                if (productModel.Quantity <= 0)
                {
                    continue;
                }

                if (!product.IsAvailableToBuy)
                {
                    errors.Add($"Product {product.Name} is not available for purchase.");
                    continue;
                }

                var unitPrice = product.Promotion?.IsValid() == true ?
                    product.Promotion.PromotionalPrice :
                    product.Price;

                var cartProduct = CartProduct.Create(product, productModel.Quantity, unitPrice);
                resultProducts.Add(cartProduct);
            }

            if (userId.HasValue)
            {
                cart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(userId.Value, cancellationToken);

                if (cart == null)
                {
                    cart = Cart.Create(userId.Value);
                    await _unitOfWork.CartRepository.AddCartAsync(cart, cancellationToken);
                }

                var validatedProductIds = resultProducts.Select(p => p.Product.Id).ToList();

                foreach (var existingProduct in cart.Products.ToList())
                {
                    if (!validatedProductIds.Contains(existingProduct.Product.Id))
                    {
                        cart.RemoveItem(existingProduct.Product.Id);
                    }
                }

                foreach (var validatedProduct in resultProducts)
                {
                    var existingProduct = cart.Products.FirstOrDefault(p => p.Product.Id == validatedProduct.Product.Id);
                    if (existingProduct != null)
                    {
                        existingProduct.UpdateQuantity(validatedProduct.Quantity);
                        existingProduct.UpdateUnitPrice(validatedProduct.UnitPrice);
                    }
                    else
                    {
                        cart.AddItem(validatedProduct);
                    }
                }

                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }
            else
            {
                cart = Cart.Create(Guid.Empty);

                foreach (var validatedProduct in resultProducts)
                {
                    cart.AddItem(validatedProduct);
                }
            }

            return (cart, errors);
        }

        public async Task<bool> DeleteRecipientAsync(Guid recipientId, Guid userId, CancellationToken cancellationToken)
        {
            var recipient = await _unitOfWork.RecipientRepository.GetByIdAsync(recipientId, cancellationToken);

            if (recipient == null)
            {
                throw new NotFoundException($"Recipient with ID {recipientId} not found");
            }

            if (recipient.UserId != userId)
            {
                throw new ForbiddenException("You are not authorized to delete this recipient");
            }

            await _unitOfWork.RecipientRepository.DeleteRecipientAsync(recipient.Id, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<Recipient> CreateOrUpdateRecipientAsync(RecipientModel model, Guid? recipientId, Guid userId, CancellationToken cancellationToken)
        {
            Recipient recipient = null;

            if (recipientId.HasValue)
            {
                recipient = await _unitOfWork.RecipientRepository.GetByIdAsync(recipientId.Value, cancellationToken);

                if (recipient == null)
                {
                    throw new NotFoundException($"Recipient with ID {recipientId.Value} was not found");
                }

                if (recipient.UserId != userId)
                {
                    throw new ForbiddenException("You are not authorized to update this recipient");
                }

                recipient.Update(model.Type, model.FirstName, model.Surname, model.CompanyName, model.TaxIdentificationNumber, model.PhoneNumber,
                    model.Street, model.HouseNumber, model.PostalCode, model.City);
            }
            else
            {
                recipient = Recipient.Create(userId, model.Type, model.FirstName, model.Surname, model.CompanyName, model.TaxIdentificationNumber,
                    model.PhoneNumber, model.Street, model.HouseNumber, model.PostalCode, model.City);

                await _unitOfWork.RecipientRepository.AddRecipientAsync(recipient, cancellationToken);
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return recipient;
        }
    }
}
