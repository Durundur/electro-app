using D = Domain.Aggregates.CartAggregate;
using Domain.Reposiotories;
using MediatR;

namespace Rest.Application.Features.Cart.GetCart
{
    public class GetCartHandler : IRequestHandler<GetCartQuery, GetCartResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetCartHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetCartResult> Handle(GetCartQuery query, CancellationToken cancellationToken)
        {
            var userCart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(query.UserId, cancellationToken);
            if (userCart == null)
            {
                userCart = D.Cart.Create(query.UserId);
                await _unitOfWork.CartRepository.AddCartAsync(userCart, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }

            var productIds = userCart.Products.Select(p => p.Product.Id).ToList();
            var products = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(productIds, cancellationToken);

            foreach (var cartProduct in userCart.Products)
            {
                var product = products.FirstOrDefault(p => p.Id == cartProduct.Product.Id);
                var unitPrice = product.EffectivePrice;

                if (product == null)
                {
                    continue;
                }

                if (!product.IsAvailableToBuy)
                {
                    userCart.RemoveItem(product.Id);
                }
                else
                {
                    cartProduct.UpdateUnitPrice(unitPrice);
                }
            }
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return GetCartMapper.MapToGetCartResult(userCart, products);
        }
    }
}
