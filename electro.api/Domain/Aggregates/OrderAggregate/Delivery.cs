using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.OrderAggregate
{
    public class Delivery
    {
        public Guid Id { get; private set; }
        public DeliveryMethod Method { get; private set; }
        public Money Cost { get; private set; }
        public string? TrackingNumber { get; private set; }
        public DeliveryStatus Status { get; private set; }
        public DateTime? ShippedAt { get; private set; }
        public DateTime? DeliveredAt { get; private set; }

        private Delivery() { }

        public static Delivery Create(DeliveryMethod method, Money cost)
        {
            if (cost.Amount < 0) 
            {
                throw new DomainException("Delivery cost cannot be negative.");
            }

            var delivery = new Delivery{
                Id = Guid.NewGuid(),
                Method = method,
                Cost = cost,
                Status = DeliveryStatus.Pending
            };

            return delivery;
        }

        public void SetTrackingNumber(string trackingNumber)
        {
            if (string.IsNullOrWhiteSpace(trackingNumber)) 
            {
                throw new DomainException("Tracking number cannot be empty.");
            }

            if (trackingNumber.Length > 50) 
            {
                throw new DomainException("Tracking number cannot be longer than 50 characters.");
            }

            TrackingNumber = trackingNumber;
        }

        public void MarkAsShipped()
        {
            if (Status != DeliveryStatus.Pending) 
            {
                throw new DomainException("Only pending deliveries can be marked as shipped.");
            }

            Status = DeliveryStatus.Shipped;
            ShippedAt = DateTime.UtcNow;
        }

        public void MarkAsDelivered()
        {
            if (Status != DeliveryStatus.Shipped) 
            {
                throw new DomainException("Only shipped deliveries can be marked as delivered.");
            }

            Status = DeliveryStatus.Delivered;
            DeliveredAt = DateTime.UtcNow;
        }
    }
}
