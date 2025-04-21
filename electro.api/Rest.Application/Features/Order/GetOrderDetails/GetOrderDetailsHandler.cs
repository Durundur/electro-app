using Application.Exceptions;
using Application.Services.OrderService;
using MediatR;

namespace Rest.Application.Features.Order.GetOrderDetails
{
    public class GetOrderDetailsHandler : IRequestHandler<GetOrderDetailsQuery, GetOrderDetailsResult>
    {
        private readonly IOrderService _orderService;

        public GetOrderDetailsHandler(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<GetOrderDetailsResult> Handle(GetOrderDetailsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var order = await _orderService.GetOrderByIdAsync(request.Id, cancellationToken);

                return GetOrderDetailsMapper.MapToGetOrderDetailsResult(order);
            }
            catch(Exception ex)
            {
                throw new BadRequestException($"Failed to get order details", ex);
            }
        }
    }
}
