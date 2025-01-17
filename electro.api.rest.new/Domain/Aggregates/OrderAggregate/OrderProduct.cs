using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class OrderProduct
    {
        public Guid Id { get; private set; }
        public Guid OrderId { get; private set; }
        public Guid ProductId { get; private set; }
        public string Name { get; private set; }
        public int Quantity { get; private set; }
        public Money Price { get; private set; }
        public Money TotalPrice => new Money(Price.Amount * Quantity, Price.Currency);

        private OrderProduct() { }

        public OrderProduct(Guid productId, string name, int quantity, Money price)
        {
            ProductId = productId;
            Name = name;
            Quantity = quantity;
            Price = price;
        }
    }
}
