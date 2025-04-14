using Domain.Aggregates.OrderAggregate;
using Domain.ValueObjects;

namespace Rest.Application.Features.Order.GetOrders
{
    public class GetOrdersResult
    {
        public IList<GetOrdersResultOrder> Orders { get; set; }
        public int PageCount { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
    }

    public class GetOrdersResultOrder
    {
        public Guid Id { get; set; }
        public Money TotalPrice { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
