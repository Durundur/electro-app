using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class OrderProduct
    {
        public Guid Id { get; private set; }
        public Guid ProductId { get; private set; }
        public string Name { get; private set; }
        public int Quantity { get; private set; }
        public Money Price { get; private set; }
        public Money TotalPrice => new Money(Price.Amount * Quantity, Price.Currency);

        private OrderProduct() { }

        public static OrderProduct Create(Guid productId, string name, int quantity, Money price)
        {
            if (productId == Guid.Empty)
            {
                throw new DomainException("Product ID cannot be empty");
            }

            if (string.IsNullOrWhiteSpace(name))
            {
                throw new DomainException("Product name cannot be empty");
            }

            if (quantity <= 0)
            {
                throw new DomainException("Quantity must be positive");
            }

            if (price.Amount <= 0)
            {
                throw new DomainException("Price must be positive");
            }

            return new OrderProduct
            {
                Id = Guid.NewGuid(),
                ProductId = productId,
                Name = name,
                Quantity = quantity,
                Price = price
            };
        }

        public void UpdatedQuantity(int newQuantity)
        {
            if (newQuantity <= 0) 
            {
                throw new DomainException("Quantity must be positive");
            }

            Quantity = newQuantity;
        }
    }
}
