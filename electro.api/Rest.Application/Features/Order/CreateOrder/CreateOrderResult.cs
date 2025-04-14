using Domain.Aggregates.OrderAggregate;

namespace Rest.Application.Features.Order.CreateOrder
{
    public class CreateOrderResult
    {
        public Guid OrderId { get; set; }
        public OrderStatus Status { get; set; }
    }
}
