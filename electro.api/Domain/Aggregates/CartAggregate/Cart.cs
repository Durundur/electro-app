using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.CartAggregate
{
    public class Cart
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        private readonly List<CartProduct> _products;
        public IReadOnlyCollection<CartProduct> Products => _products.AsReadOnly();
        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        private Cart() 
        {
            _products = new List<CartProduct>();
        }

        public static Cart Create(Guid userId)
        {
            var cart = new Cart
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            return cart;
        }

        public void AddItem(Guid productId, int quantity, Money unitPrice)
        {

            if (quantity <= 0)
                throw new DomainException("Quantity must be positive");

            var existingItem = _products.FirstOrDefault(i => i.ProductId == productId);
            if (existingItem != null)
            {
                existingItem.UpdateQuantity(existingItem.Quantity + quantity);
            }
            else
            {
                var newItem = CartProduct.Create(productId, quantity, unitPrice);
                _products.Add(newItem);
            }

            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateItemQuantity(Guid productId, int newQuantity)
        {
            if (newQuantity <= 0)
                throw new DomainException("Quantity must be positive");

            var item = _products.FirstOrDefault(i => i.ProductId == productId)
                ?? throw new DomainException("Item not found in cart");

            item.UpdateQuantity(newQuantity);
            UpdatedAt = DateTime.UtcNow;
        }

        public void RemoveItem(Guid productId)
        {
            var item = _products.FirstOrDefault(i => i.ProductId == productId)
                ?? throw new DomainException("Item not found in cart");

            _products.Remove(item);
            UpdatedAt = DateTime.UtcNow;
        }

        public Money CalculateTotal()
        {
            if (!_products.Any())
                return Money.Zero("PLN");

            var currency = _products.First().UnitPrice.Currency;
            var total = _products.Sum(item => item.CalculateSubtotal().Amount);
            return new Money(total, currency);
        }

        public void Clear()
        {
            _products.Clear();
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
