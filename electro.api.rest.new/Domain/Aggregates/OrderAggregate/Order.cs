using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class Order
    {
        public Guid Id { get; private set; }
        public Guid UserProfileId { get; private set; }
        public OrderStatus Status { get; private set; }
        private readonly List<OrderProduct> _products;
        public IReadOnlyCollection<OrderProduct> Products => _products.AsReadOnly();
        public Payment Payment { get; private set; }
        public Delivery Delivery { get; private set; }
        public Recipient Recipient { get; private set; }
        public Money TotalPrice
        {
            get
            {
                var productsTotal = _products.Sum(product => product.TotalPrice.Amount);
                var totalAmount = productsTotal + Delivery.Cost.Amount + Payment.Cost.Amount;
                return new Money(totalAmount, Delivery.Cost.Currency);
            }
        }
        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        private Order() { }

        public Order(Guid userProfileId, IList<OrderProduct> products, Payment payment, Delivery delivery, Recipient recipient)
        {
            UserProfileId = userProfileId;
            _products = products.ToList();
            Payment = payment;
            Delivery = delivery;
            Recipient = recipient;
            Status = OrderStatus.Created;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
