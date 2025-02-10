using Domain.Aggregates.OrderAggregate;
using Domain.ValueObjects;

namespace Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersResult
    {
        public IList<GetUserOrdersResultOrder> Orders { get; set; }
        public int PageCount { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
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
        public int Quantity { get; set; }
        public Money Price { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
    }
}
