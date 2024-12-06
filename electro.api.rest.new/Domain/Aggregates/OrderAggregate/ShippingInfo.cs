using Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Aggregates.OrderAggregate
{
    public class ShippingInfo
    {
        public ShippingMethod Method { get; private set; }
        public Money Cost { get; private set; }
        public string TrackingNumber { get; private set; }

        private ShippingInfo() { }

        public ShippingInfo(ShippingMethod method, Money cost)
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
