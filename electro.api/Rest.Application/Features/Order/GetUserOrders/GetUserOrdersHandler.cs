using Application.Services.OrderService;
using MediatR;

namespace Rest.Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersHandler : IRequestHandler<GetUserOrdersQuery, GetUserOrdersResult>
    {
        private readonly IOrderService _orderService;

        public GetUserOrdersHandler(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<GetUserOrdersResult> Handle(GetUserOrdersQuery query, CancellationToken cancellationToken)
        {
            var (orders, totalOrders) = await _orderService.GetUserOrdersAsync(query.UserId, query.Page, query.PageSize, cancellationToken);

            return new GetUserOrdersResult(
                GetUserOrdersMapper.MapToGetUserOrders(orders).ToList(),
                totalOrders,
                query.Page,
                query.PageSize
            );
        }
    }
}
