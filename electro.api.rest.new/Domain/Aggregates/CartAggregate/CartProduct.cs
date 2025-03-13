using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.CartAggregate
{
    public class CartProduct
    {
        public Guid Id { get; private set; }
        public Guid ProductId { get; private set; }
        public int Quantity { get; private set; }
        public Money UnitPrice { get; private set; }

        private CartProduct() { }
        
        public static CartProduct Create(Guid productId, int quantity, Money unitPrice)
        {
            if (quantity <= 0)
                throw new DomainException("Quantity must be positive");

            return new CartProduct
            {
                ProductId = productId,
                Quantity = quantity,
                UnitPrice = unitPrice
            };
        }

        public void UpdateQuantity(int newQuantity)
        {
            if (newQuantity <= 0)
                throw new ArgumentException("Quantity must be positive", nameof(newQuantity));

            Quantity = newQuantity;
        }

        public Money CalculateSubtotal()
        {
            return new Money(UnitPrice.Amount * Quantity, UnitPrice.Currency);
        }
    }
}
