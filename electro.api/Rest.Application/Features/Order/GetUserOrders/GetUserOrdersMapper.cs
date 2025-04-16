using D = Domain.Aggregates;

namespace Rest.Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersMapper
    {
        public static IList<GetUserOrdersResultOrder> MapToGetUserOrders(IList<D.OrderAggregate.Order> orders)
        {
            return orders.Select(order => new GetUserOrdersResultOrder()
            {
                Id = order.Id,
                Number = order.Number,
                Status = order.Status,
                TotalPrice = order.TotalPrice,
                CreatedAt = order.CreatedAt,
                Products = order.Products.Select(orderProduct => new GetUserOrdersResultOrderProduct()
                {
                    Id = orderProduct.Id,
                    ProductId = orderProduct.Product.Id,
                    Price = orderProduct.Price,
                    Quantity = orderProduct.Quantity,
                    Name = orderProduct.Name,
                    Photo = orderProduct.Product.Photos.FirstOrDefault()
                }).ToList(),
            }).ToList();
        }
    }
}
