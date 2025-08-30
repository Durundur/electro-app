using Application.Exceptions;
using Application.Services.OrderService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Order.GetUserOrderDetails
{
    public class GetUserOrderDetailsHandler : IRequestHandler<GetUserOrderDetailsQuery, GetUserOrderDetailsResult>
    {
        private readonly IOrderService _orderService;
        private readonly IUserContext _userContext;

        public GetUserOrderDetailsHandler(IOrderService orderService, IUserContext userContext)
        {
            _orderService = orderService;
            _userContext = userContext;
        }

        public async Task<GetUserOrderDetailsResult> Handle(GetUserOrderDetailsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var order = await _orderService.GetOrderByIdAsync(request.OrderId, cancellationToken);

                if (!_userContext.IsAdmin && order.UserId != _userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this order.");
                }

                return GetUserOrderDetailsMapper.MapToGetUserOrderDetailsResult(order);
            }
            catch (Exception ex) 
            {
                throw new BadRequestException($"Failed to get order details", ex);
            }
        }
    }
}
