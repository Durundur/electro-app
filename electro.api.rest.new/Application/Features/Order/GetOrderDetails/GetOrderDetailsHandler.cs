using Application.Reposiotories;
using MediatR;

namespace Application.Features.Order.GetOrderDetails
{
    public class GetOrderDetailsHandler : IRequestHandler<GetOrderDetailsQuery, GetOrderDetailsResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetOrderDetailsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetOrderDetailsResult> Handle(GetOrderDetailsQuery request, CancellationToken cancellationToken)
        {
            var order = await _unitOfWork.OrderRepository.GetOrderByIdAsync(request.Id);
            var productsIds = order.Products.Select(x => x.ProductId);
            var productCatalog = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(productsIds);

            return GetOrderDetailsMapper.MapToGetOrderDetailsResult(order, productCatalog);
        }
    }
}
