using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class OrderProduct
    {
        public Guid Id { get; private set; }
        public Product Product { get; private set; }
        public string Name { get; private set; }
        public int Quantity { get; private set; }
        public Money Price { get; private set; }
        public Money TotalPrice => new Money(Price.Amount * Quantity, Price.Currency);

        private OrderProduct() { }

        public static OrderProduct Create(Product product, string name, int quantity, Money price)
        {
            if (product == null)
            {
                throw new DomainException("Product cannot be null");
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
                Product = product,
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
