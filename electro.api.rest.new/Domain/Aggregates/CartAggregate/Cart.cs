using Domain.ValueObjects;

namespace Domain.Aggregates.CartAggregate
{
    public class Cart
    {
        public Guid Id { get; private set; }
        public Guid UserProfileId { get; private set; }
        private readonly List<CartProduct> _products;
        public IReadOnlyCollection<CartProduct> Products => _products.AsReadOnly();
        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        public Cart(Guid userProfileId)
        {
            UserProfileId = userProfileId;
            _products = new List<CartProduct>();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void AddOrUpdateItem(CartProduct cartProduct)
        {
            var existingItem = _products.FirstOrDefault(i => i.ProductId == cartProduct.Id);

            if (existingItem != null)
            {
                existingItem.UpdateQuantity(cartProduct.Quantity);
            }
            else
            {
                _products.Add(cartProduct);
            }

            UpdatedAt = DateTime.UtcNow;
        }

        public void RemoveItem(Guid productId)
        {
            var item = _products.FirstOrDefault(i => i.ProductId == productId);
            if (item != null)
            {
                _products.Remove(item);
                UpdatedAt = DateTime.UtcNow;
            }
        }

        public int GetTotalQuantity()
        {
            return _products.Sum(p => p.Quantity);
        }

        public Money GetTotalPrice()
        {
            var totalAmount = _products.Sum(p => p.GetTotalPrice().Amount);
            return new Money(totalAmount, _products.FirstOrDefault()?.Price.Currency ?? "PLN");
        }
    }
}
