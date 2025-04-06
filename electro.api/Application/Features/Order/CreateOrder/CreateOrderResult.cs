using Domain.Aggregates.OrderAggregate;

namespace Application.Features.Order.CreateOrder
{
    public class CreateOrderResult
    {
        public Guid OrderId { get; set; }
        public OrderStatus Status { get; set; }
    }
}
