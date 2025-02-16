using Domain.Aggregates.UserAggregate;
using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class Order
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public int Number { get; private set; }
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

        public Order(Guid userId, IList<OrderProduct> products, Payment payment, Delivery delivery, Recipient recipient)
        {
            UserId = userId;
            _products = products.ToList();
            Payment = payment;
            Delivery = delivery;
            Recipient = recipient;
            Status = OrderStatus.Created;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateStatus(OrderStatus newStatus)
        {
            if (newStatus == OrderStatus.Paid && Payment.Status != PaymentStatus.Paid)
            {
                throw new InvalidOperationException("Cannot mark order as Paid if payment is not completed.");
            }

            if (newStatus == OrderStatus.Cancelled && Payment.Status == PaymentStatus.Paid)
            {
                throw new InvalidOperationException("Cannot cancel order with completed payment. Consider refunding.");
            }

            Status = newStatus;

            if (newStatus == OrderStatus.Paid)
            {
                Payment.MarkAsPaid();
            }

            if (newStatus == OrderStatus.Cancelled && Payment.Status == PaymentStatus.Pending)
            {
                Payment.Cancel();
            }

            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateTrackingNumber(string trackingNumber)
        {
            Delivery.SetTrackingNumber(trackingNumber);
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateRecipient(RecipientType type, string? firstName, string? surname, string? companyName, string? taxIdentificationNumber, string phoneNumber,
            string street, string houseNumber, string postalCode, string city)
        {
            Recipient.Update(type, firstName, surname, companyName, taxIdentificationNumber, phoneNumber, street, houseNumber, postalCode, city);
        }
    }
}
