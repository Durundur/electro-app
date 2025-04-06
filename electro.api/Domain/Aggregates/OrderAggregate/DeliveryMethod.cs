using System.ComponentModel;

namespace Domain.Aggregates.OrderAggregate
{
    public enum DeliveryMethod
    {
        [Description("Courier Express Delivery")]
        CourierExpress = 1,

        [Description("Courier Standard Delivery")]
        CourierStandard = 2,

        [Description("Cash on Delivery")]
        CourierCashOnDelivery = 3,

        [Description("Parcel Locker Delivery")]
        Locker = 4,

        [Description("Zabka Store Pickup")]
        PickupZabka = 5
    }
}
