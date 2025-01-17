using Domain.Aggregates.OrderAggregate;

namespace Application.Reposiotories
{
    public interface IOrderRepository
    {
        IQueryable<Order> GetOrdersQuery();
        Task AddOrderAsync(Order order, CancellationToken cancellationToken);
        Task<Order> GetOrderByIdAsync(Guid id);
    }
}
