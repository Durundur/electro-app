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
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            return cart;
        }

        public void AddItem(CartProduct product)
        {
            if (product.Quantity < 0)
            {
                throw new DomainException("Quantity must be positive");
            }

            var existingItem = _products.FirstOrDefault(i => i.Product.Id == product.Id);
            if (existingItem != null)
            {
                existingItem.UpdateQuantity(existingItem.Quantity + product.Quantity);
            }
            else
            {
                _products.Add(product);
            }

            UpdatedAt = DateTime.UtcNow;
        }

        public void RemoveItem(Guid productId)
        {
            var item = _products.FirstOrDefault(i => i.Product.Id == productId);

            if (item == null)
            {
                throw new DomainException("Item not found in cart");
            }

            _products.Remove(item);
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
