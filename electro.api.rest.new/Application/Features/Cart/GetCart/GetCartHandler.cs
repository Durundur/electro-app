using Application.Reposiotories;
using D = Domain.Aggregates.CartAggregate;
using MediatR;

namespace Application.Features.Cart.GetCart
{
    public class GetCartHandler : IRequestHandler<GetCartQuery, GetCartResult>
    {
        private readonly IProductRepository _productRepository;
        private readonly ICartRepository _cartRepository;

        public GetCartHandler(IProductRepository productRepository, ICartRepository cartRepository)
        {
            _productRepository = productRepository;
            _cartRepository = cartRepository;
        }

        public async Task<GetCartResult> Handle(GetCartQuery request, CancellationToken cancellationToken)
        {
            D.Cart userCart = await _cartRepository.GetCartByUserIdAsync(request.UserId);
            if (userCart == null)
            {
                return null;
            }

            var productIds = userCart.Products.Select(p => p.ProductId).ToList();
            var products = await _productRepository.GetProductsByIds(productIds);

            return GetCartMapper.MapToGetCartResult(userCart, products);
        }
    }
}
