using Application.Services.OrderService;
using MediatR;

namespace Rest.Application.Features.Order.GetOrders
{
    public class GetOrdersHandler : IRequestHandler<GetOrdersQuery, GetOrdersResult>
    {
        private readonly IOrderService _orderService;

        public GetOrdersHandler(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<GetOrdersResult> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            var (orders, totalOrders) = await _orderService.GetOrdersAsync(request.Page, request.PageSize, cancellationToken);

            var result = new GetOrdersResult(GetOrdersMapper.MapToGetOrdersResult(orders).ToList(), totalOrders, request.Page, request.PageSize);

            return result;
        }
    }
}
