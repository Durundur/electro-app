using Application.Reposiotories;
using D = Domain.Aggregates.CartAggregate;
using MediatR;

namespace Application.Features.Cart.GetCart
{
    public class GetCartHandler : IRequestHandler<GetCartQuery, GetCartResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetCartHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetCartResult> Handle(GetCartQuery request, CancellationToken cancellationToken)
        {
            D.Cart userCart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(request.UserId);
            if (userCart == null)
            {
                userCart = new D.Cart(request.UserId);
                _unitOfWork.CartRepository.AddCart(userCart);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }

            var productIds = userCart.Products.Select(p => p.ProductId).ToList();
            var products = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(productIds);

            return GetCartMapper.MapToGetCartResult(userCart, products);
        }
    }
}
