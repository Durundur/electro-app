using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.CartAggregate
{
    public class CartProduct
    {
        public Guid Id { get; private set; }
        public Product Product { get; private set; }
        public int Quantity { get; private set; }
        public Money UnitPrice { get; private set; }

        private CartProduct() { }
        
        public static CartProduct Create(Product product, int quantity, Money unitPrice)
        {
            if (quantity <= 0)
            {
                throw new DomainException("Quantity must be positive");
            }
                
            return new CartProduct
            {
                Product = product,
                Quantity = quantity,
                UnitPrice = unitPrice
            };
        }

        public void UpdateQuantity(int newQuantity)
        {
            if (newQuantity <= 0)
            {
                throw new ArgumentException("Quantity must be positive", nameof(newQuantity));
            }

            Quantity = newQuantity;
        }

        public void UpdateUnitPrice(Money newUnitPrice)
        {
            UnitPrice = newUnitPrice;
        }

        public Money CalculateSubtotal()
        {
            return new Money(UnitPrice.Amount * Quantity, UnitPrice.Currency);
        }
    }
}
