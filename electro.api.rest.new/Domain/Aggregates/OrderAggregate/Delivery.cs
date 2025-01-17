using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class Delivery
    {
        public DeliveryMethod Method { get; private set; }
        public Money Cost { get; private set; }
        public string? TrackingNumber { get; private set; }

        private Delivery() { }

        public Delivery(DeliveryMethod method, Money cost)
        {
            Method = method;
            Cost = cost;
        }

        public void SetTrackingNumber(string trackingNumber)
        {
            TrackingNumber = trackingNumber;
        }
    }
}
