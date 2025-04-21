using Application.Exceptions;
using Application.Services.OrderService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersHandler : IRequestHandler<GetUserOrdersQuery, GetUserOrdersResult>
    {
        private readonly IOrderService _orderService;
        private readonly IUserContext _userContext;

        public GetUserOrdersHandler(IOrderService orderService, IUserContext userContext)
        {
            _orderService = orderService;
            _userContext = userContext;
        }

        public async Task<GetUserOrdersResult> Handle(GetUserOrdersQuery query, CancellationToken cancellationToken)
        {
            try
            {
                var (orders, totalOrders) = await _orderService.GetUserOrdersAsync(query.UserId, query.Page, query.PageSize, cancellationToken);

                if (orders.Any(o => o.UserId != _userContext.UserId) || _userContext.IsAuthenticated && !_userContext.IsAdmin)
                {
                    throw new UnauthorizedException("You do not have permission to access this order.");
                }

                return new GetUserOrdersResult(
                   GetUserOrdersMapper.MapToGetUserOrders(orders).ToList(),
                   totalOrders,
                   query.Page,
                   query.PageSize
                );
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get user orders", ex);
            }
        }
    }
}
