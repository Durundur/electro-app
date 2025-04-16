using Application.Exceptions;
using Application.Services.OrderService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Order.GetOrderDetails
{
    public class GetOrderDetailsHandler : IRequestHandler<GetOrderDetailsQuery, GetOrderDetailsResult>
    {
        private readonly IOrderService _orderService;
        private readonly IUserContext _userContext;

        public GetOrderDetailsHandler(IOrderService orderService, IUserContext userContext)
        {
            _orderService = orderService;
            _userContext = userContext;
        }

        public async Task<GetOrderDetailsResult> Handle(GetOrderDetailsQuery request, CancellationToken cancellationToken)
        {
            var order = await _orderService.GetOrderByIdAsync(request.Id, cancellationToken);

            if (order.UserId != _userContext.UserId && !_userContext.IsAdmin)
            {
                throw new UnauthorizedException("You do not have permission to access this order.");
            }

            return GetOrderDetailsMapper.MapToGetOrderDetailsResult(order);
        }
    }
}
