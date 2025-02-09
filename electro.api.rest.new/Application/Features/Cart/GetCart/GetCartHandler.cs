using Application.Services.UserContext;
using Domain.Reposiotories;
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

        public async Task<GetCartResult> Handle(GetCartQuery query, CancellationToken cancellationToken)
        {
            var userCart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(query.UserId);
            if (userCart == null)
            {
                userCart = new Domain.Aggregates.CartAggregate.Cart(query.UserId);
                _unitOfWork.CartRepository.AddCart(userCart);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }

            var productIds = userCart.Products.Select(p => p.ProductId).ToList();
            var products = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(productIds);

            return GetCartMapper.MapToGetCartResult(userCart, products);
        }
    }
}
