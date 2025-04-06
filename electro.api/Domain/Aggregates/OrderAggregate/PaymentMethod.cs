using System.ComponentModel;

namespace Domain.Aggregates.OrderAggregate
{
    public enum PaymentMethod
    {
        [Description("Credit Card Payment")]
        CreditCard = 1,

        [Description("Instant Bank Transfer")]
        InstantTransfer = 2,

        [Description("Traditional Bank Transfer")]
        BankTransfer = 3,

        [Description("Google Pay")]
        GooglePay = 4,

        [Description("BLIK Payment")]
        Blik = 5
    }
}
