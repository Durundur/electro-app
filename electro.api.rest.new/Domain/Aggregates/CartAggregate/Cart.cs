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
            Id = Guid.NewGuid();
            UserProfileId = userProfileId;
            _products = new List<CartProduct>();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void AddItem(Guid productId, int quantity, Money price)
        {
            if (quantity <= 0)
                throw new ArgumentException("Quantity must be positive", nameof(quantity));

            var existingItem = _products.FirstOrDefault(i => i.ProductId == productId);
            if (existingItem != null)
            {
                existingItem.UpdateQuantity(quantity);
            }
            else
            {
                _products.Add(new CartProduct(productId, quantity, price));
            }

            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateItemQuantity(Guid productId, int newQuantity)
        {
            if (newQuantity <= 0)
                throw new ArgumentException("Quantity must be positive", nameof(newQuantity));

            var item = _products.FirstOrDefault(i => i.ProductId == productId);
            if (item != null)
            {
                item.UpdateQuantity(newQuantity);
                UpdatedAt = DateTime.UtcNow;
            }
        }
    }
}
