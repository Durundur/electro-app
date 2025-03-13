namespace Domain.Aggregates.OrderAggregate
{
    public enum OrderStatus
    {
        Created,
        Paid,
        Processing,
        Shipped,
        Completed,
        Cancelled
    }
}
