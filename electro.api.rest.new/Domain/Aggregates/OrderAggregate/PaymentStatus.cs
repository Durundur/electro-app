using System.ComponentModel;

namespace Domain.Aggregates.OrderAggregate
{
    public enum PaymentStatus
    {
        [Description("Payment Pending")]
        Pending = 1,

        [Description("Payment Completed")]
        Paid = 2,

        [Description("Payment Failed")]
        Failed = 3,

        [Description("Payment Refunded")]
        Refunded = 4
    }
}
