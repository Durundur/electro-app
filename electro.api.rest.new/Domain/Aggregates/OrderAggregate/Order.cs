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
        public Money TotalPrice { get; private set; }
        public Address ShippingAddress { get; private set; }
        public CustomerInfo CustomerInfo { get; private set; }
        public PaymentInfo PaymentInfo { get; private set; }
        public ShippingInfo ShippingInfo { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        public Order(Guid userProfileId, IEnumerable<OrderProduct> products, Address shippingAddress, CustomerInfo customerInfo)
        {
            Id = Guid.NewGuid();
            UserProfileId = userProfileId;
            _products = new List<OrderProduct>(products);
            ShippingAddress = shippingAddress;
            CustomerInfo = customerInfo;
            Status = OrderStatus.Created;
            TotalPrice = CalculateTotalPrice();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void SetPaymentInfo(PaymentInfo paymentInfo)
        {
            PaymentInfo = paymentInfo;
            UpdatedAt = DateTime.UtcNow;
        }

        public void SetShippingInfo(ShippingInfo shippingInfo)
        {
            ShippingInfo = shippingInfo;
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateStatus(OrderStatus newStatus)
        {
            Status = newStatus;
            UpdatedAt = DateTime.UtcNow;
        }

        private Money CalculateTotalPrice()
        {
            var productsTotal = _products.Sum(p => p.TotalPrice.Amount);
            var shippingCost = ShippingInfo?.Cost.Amount ?? 0;
            return new Money(productsTotal + shippingCost, _products.First().TotalPrice.Currency);
        }
    }
}
