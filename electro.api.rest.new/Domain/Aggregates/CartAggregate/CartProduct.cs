using Domain.ValueObjects;

namespace Domain.Aggregates.CartAggregate
{
    public class CartProduct
    {
        public Guid Id { get; private set; }
        public Guid ProductId { get; private set; }
        public int Quantity { get; private set; }
        public Money Price { get; private set; }

        public CartProduct(Guid productId, int quantity, Money price)
        {
            Id = Guid.NewGuid();
            ProductId = productId;
            Quantity = quantity;
            Price = price;
        }

        public void UpdateQuantity(int newQuantity)
        {
            if (newQuantity <= 0)
                throw new ArgumentException("Quantity must be positive", nameof(newQuantity));

            if (newQuantity > Quantity)
                throw new InvalidOperationException("Cannot decrease quantity below zero");

            Quantity = newQuantity;
        }

        public Money GetTotalPrice()
        {
            return new Money(Price.Amount * Quantity, Price.Currency);
        }
    }
}
