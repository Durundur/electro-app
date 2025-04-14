using Domain.Aggregates.OrderAggregate;
using Domain.ValueObjects;
using Rest.Application.Features.Shared.Pagination;

namespace Rest.Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersResult : PaginatedResult<GetUserOrdersResultOrder>
    {
        public GetUserOrdersResult(IReadOnlyList<GetUserOrdersResultOrder> items, int count, int page, int pageSize)
            : base(items, count, page, pageSize)
        {
        }
    }

    public class GetUserOrdersResultOrder
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public Money TotalPrice { get; set; }
        public OrderStatus Status { get; set; }
        public IList<GetUserOrdersResultOrderProduct> Products { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class GetUserOrdersResultOrderProduct
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Money Price { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
    }
}
