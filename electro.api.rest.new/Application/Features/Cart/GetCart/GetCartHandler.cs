using D = Domain.Aggregates.CartAggregate;
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
            var userCart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(query.UserId, cancellationToken);
            if (userCart == null)
            {
                userCart = D.Cart.Create(query.UserId);
                await _unitOfWork.CartRepository.AddCartAsync(userCart, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }

            var productIds = userCart.Products.Select(p => p.ProductId).ToList();
            var products = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(productIds, cancellationToken);

            return GetCartMapper.MapToGetCartResult(userCart, products);
        }
    }
}
