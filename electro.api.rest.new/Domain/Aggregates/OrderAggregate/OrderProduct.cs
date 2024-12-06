using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class OrderProduct
    {
        public Guid Id { get; private set; }
        public Guid ProductId { get; private set; }
        public string ProductName { get; private set; }
        public int Quantity { get; private set; }
        public Money UnitPrice { get; private set; }
        public Money TotalPrice => new Money(UnitPrice.Amount * Quantity, UnitPrice.Currency);

        private OrderProduct() { }

        public OrderProduct(Guid productId, string productName, int quantity, Money unitPrice)
        {
            Id = Guid.NewGuid();
            ProductId = productId;
            ProductName = productName;
            Quantity = quantity;
            UnitPrice = unitPrice;
        }
    }
}
