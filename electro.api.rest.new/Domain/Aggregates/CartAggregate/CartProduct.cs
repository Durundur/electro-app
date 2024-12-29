using Domain.ValueObjects;

namespace Domain.Aggregates.CartAggregate
{
    public class CartProduct
    {
        public Guid Id { get; private set; }
        public Guid CartId { get; private set; }
        public Guid ProductId { get; private set; }
        public int Quantity { get; private set; }
        public Money Price { get; private set; }

        private CartProduct() { }
        public CartProduct(Guid cartId, Guid productId, int quantity, Money price)
        {
            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity must be positive.", nameof(quantity));
            }

            CartId = cartId;
            ProductId = productId;
            Quantity = quantity;
            Price = price;
        }

        public void UpdateQuantity(int newQuantity)
        {
            if (newQuantity <= 0)
                throw new ArgumentException("Quantity must be positive", nameof(newQuantity));

            Quantity = newQuantity;
        }

        public void UpdatePrice(Money price)
        {
            Price = price;
        }

        public Money GetTotalPrice()
        {
            return new Money(Price.Amount * Quantity, Price.Currency);
        }
    }
}
