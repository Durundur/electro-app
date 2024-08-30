using System.Transactions;

namespace electro.api.rest.Models.Order.Payment
{
    public enum PaymentStatus
    {
        Started,
        InProgress,
        Paid
    }
}
