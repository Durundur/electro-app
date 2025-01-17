using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class Payment
    {
        public PaymentMethod Method { get; private set; }
        public Money Cost { get; private set; }
        public PaymentStatus Status { get; private set; }
        public DateTime? PaidAt { get; private set; }

        private Payment() { }

        public Payment(PaymentMethod method, Money cost)
        {
            Method = method;
            Cost = cost;
            Status = PaymentStatus.Pending;
        }

        public void UpdateStatus(PaymentStatus newStatus)
        {
            Status = newStatus;
            if (newStatus == PaymentStatus.Paid)
            {
                PaidAt = DateTime.UtcNow;
            }
        }
    }
}
