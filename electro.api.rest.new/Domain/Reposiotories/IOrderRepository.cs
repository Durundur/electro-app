using Domain.Aggregates.OrderAggregate;

namespace Domain.Reposiotories
{
    public interface IOrderRepository
    {
        IQueryable<Order> GetOrdersQuery();
        Task<Order> AddOrderAsync(Order order, CancellationToken cancellationToken = default);
        Task<Order> GetOrderByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
