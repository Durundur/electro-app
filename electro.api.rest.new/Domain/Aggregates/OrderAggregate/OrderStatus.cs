namespace Domain.Aggregates.OrderAggregate
{
    public enum OrderStatus
    {
        Created,
        PaymentPending,
        Paid,
        Shipped,
        Delivered,
        Cancelled
    }
}
