using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class Payment
    {
        public Guid Id { get; private set; }
        public PaymentMethod Method { get; private set; }
        public Money Cost { get; private set; }
        public PaymentStatus Status { get; private set; }
        public DateTime? PaidAt { get; private set; }

        private Payment() { }

        public static Payment Create(PaymentMethod method, Money cost)
        {
            if (cost.Amount <= 0)
                throw new DomainException("Payment cost must be greater than zero.");

            return new Payment
            {
                Id = Guid.NewGuid(),
                Method = method,
                Cost = cost,
                Status = PaymentStatus.Pending,
            };
        }


        public void MarkAsPaid()
        {
            if (Status != PaymentStatus.Pending)
            {
                throw new InvalidOperationException("Only pending payments can be marked as paid.");
            }

            Status = PaymentStatus.Paid;
            PaidAt = DateTime.UtcNow;
        }

        public void Cancel()
        {
            if (Status == PaymentStatus.Paid)
            {
                throw new InvalidOperationException("Cannot cancel a completed payment. Consider refunding.");
            }

            Status = PaymentStatus.Failed;
        }
    }
}
