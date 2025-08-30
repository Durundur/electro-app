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
                if (!_userContext.IsAdmin && query.UserId != _userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access these orders.");
                }

                var (orders, totalOrders) = await _orderService.GetUserOrdersAsync(query.UserId, query.Page, query.PageSize, cancellationToken);

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
