using Application.Exceptions;
using Application.Services.OrderService;
using Application.Services.UserContext;
using Application.Shared.Pagination;
using Domain.Aggregates.OrderAggregate;
using HotChocolate;
using HotChocolate.Authorization;

namespace Graphql.Application.Queries
{
    public partial class Query
    {
        [Authorize(Roles = ["Admin"])]
        public async Task<Order> GetOrder([Service] IOrderService orderService, Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                var order = await orderService.GetOrderByIdAsync(id, cancellationToken);

                return order;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get order details", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<PaginatedResult<Order>> GetOrders([Service] IOrderService orderService, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            try
            {
                var (orders, totalOrders) = await orderService.GetOrdersAsync(page, pageSize, cancellationToken);

                return new PaginatedResult<Order>(orders, totalOrders, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get orders", ex);
            }
        }

        [Authorize]
        public async Task<PaginatedResult<Order>> GetUserOrders([Service] IOrderService orderService, [Service] IUserContext userContext, Guid userId, int page = 1,
            int pageSize = 10, CancellationToken cancellationToken = default)
        {
            try
            {
                if (!userContext.IsAdmin && userId != userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access these orders.");
                }

                var (orders, totalOrders) = await orderService.GetUserOrdersAsync(userContext.UserId, page, pageSize, cancellationToken);

                return new PaginatedResult<Order>(orders, totalOrders, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get user orders", ex);
            }
        }

        [Authorize]
        public async Task<Order> GetUserOrder([Service] IOrderService orderService, [Service] IUserContext userContext, Guid orderId, CancellationToken cancellationToken = default)
        {
            try
            {
                var order = await orderService.GetOrderByIdAsync(orderId, cancellationToken);

                if (!userContext.IsAdmin && order.UserId != userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this order.");
                }

                return order;
            }
            catch (Exception ex) 
            {
                throw new BadRequestException($"Failed to get order details", ex);
            }
        }
    }
}
