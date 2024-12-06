namespace Domain.Aggregates.OrderAggregate
{
    public class PaymentInfo
    {
        public PaymentMethod Method { get; private set; }
        public PaymentStatus Status { get; private set; }
        public DateTime? PaidAt { get; private set; }

        private PaymentInfo() { }

        public PaymentInfo(PaymentMethod method)
        {
            Method = method;
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
