using Application.Services.OrderService;
using MediatR;

namespace Rest.Application.Features.Order.GetUserOrderDetails
{
    public class GetUserOrderDetailsHandler : IRequestHandler<GetUserOrderDetailsQuery, GetUserOrderDetailsResult>
    {
        private readonly IOrderService _orderService;

        public GetUserOrderDetailsHandler(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<GetUserOrderDetailsResult> Handle(GetUserOrderDetailsQuery request, CancellationToken cancellationToken)
        {
            var order = await _orderService.GetOrderByIdAsync(request.OrderId, cancellationToken);

            return GetUserOrderDetailsMapper.MapToGetUserOrderDetailsResult(order);
        }
    }
}
