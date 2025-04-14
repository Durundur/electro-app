using D = Domain.Aggregates.OrderAggregate;

namespace Rest.Application.Features.Order.GetOrders
{
    public static class GetOrdersMapper
    {
        public static GetOrdersResult MapToGetOrdersResult(IList<D.Order> orders)
        {
            return new GetOrdersResult
            {
                Orders = orders.Select(o => MapToGetOrdersResultOrder(o)).ToList()
            };
        }

        public static GetOrdersResultOrder MapToGetOrdersResultOrder(D.Order order)
        {
            return new GetOrdersResultOrder
            {
                Id = order.Id,
                Status = order.Status,
                TotalPrice = order.TotalPrice,
                CreatedAt = order.CreatedAt,
            };
        }
    }
}
