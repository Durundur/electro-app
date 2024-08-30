using electro.api.rest.Models.Order;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IOrderRepository
    {
        IQueryable<OrderModel> GetUserOrders(Guid userId);
        IQueryable<OrderModel> GetOrderById(Guid Id);
        IQueryable<OrderModel> GetOrderByIdForUser(Guid orderId, Guid userId);
        Task<OrderModel> CreateOrder(OrderModel order);
    }
}
