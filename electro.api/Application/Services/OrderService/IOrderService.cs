using Application.Services.Models;
using Domain.Aggregates.OrderAggregate;

namespace Application.Services.OrderService
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(Guid userId, OrderModel orderModel, CancellationToken cancellationToken = default);
        Task<Order> GetOrderByIdAsync(Guid orderId, CancellationToken cancellationToken = default);
        Task<(List<Order> Orders, int totalOrders)> GetOrdersAsync(int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
        Task<(List<Order> Orders, int totalOrders)> GetUserOrdersAsync(Guid userId, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
        Task<Order> UpdateOrderAsync(Guid orderId, OrderStatus newStatus, string? trackingNumber = null, RecipientModel? recipient = null, CancellationToken cancellationToken = default);

    }
}
