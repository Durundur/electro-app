using Domain.Aggregates.OrderAggregate;
using Domain.ValueObjects;
using Rest.Application.Features.Shared.Pagination;

namespace Rest.Application.Features.Order.GetOrders
{
    public class GetOrdersResult : PaginatedResult<GetOrdersResultOrder>
    {
        public GetOrdersResult(IReadOnlyList<GetOrdersResultOrder> items, int count, int page, int pageSize)
            : base(items, count, page, pageSize)
        {
        }
    }

    public class GetOrdersResultOrder
    {
        public Guid Id { get; set; }
        public Money TotalPrice { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
