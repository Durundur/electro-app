using Domain.Reposiotories;
using MediatR;

namespace Application.Features.Order.GetUserOrderDetails
{
    public class GetUserOrderDetailsHandler : IRequestHandler<GetUserOrderDetailsQuery, GetUserOrderDetailsResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetUserOrderDetailsHandler(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetUserOrderDetailsResult> Handle(GetUserOrderDetailsQuery request, CancellationToken cancellationToken)
        {
            var order = await _unitOfWork.OrderRepository.GetOrderByIdAsync(request.OrderId, cancellationToken);

            var productsIds = order.Products.Select(x => x.ProductId);
            var productCatalog = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(productsIds);

            return GetUserOrderDetailsMapper.MapToGetUserOrderDetailsResult(order, productCatalog);
        }
    }
}
