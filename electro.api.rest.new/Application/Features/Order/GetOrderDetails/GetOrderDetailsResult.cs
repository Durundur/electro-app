using Domain.Aggregates.OrderAggregate;
using Domain.ValueObjects;

namespace Application.Features.Order.GetOrderDetails
{
    public class GetOrderDetailsResult
    {
        public Guid Id { get; set; }
        public OrderStatus Status { get; set; }
        public IList<GetOrderDetailsResultProduct> Products { get; set; }
        public Payment Payment { get; set; }
        public Delivery Delivery { get; set; }
        public Recipient Recipient { get; set; }
        public Money TotalPrice { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class GetOrderDetailsResultProduct
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public int Quantity { get; set; }
        public Money Price { get; set; }
        public Money TotalPrice => new Money(Price.Amount * Quantity, Price.Currency);
    }
}
