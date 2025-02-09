using D = Domain.Aggregates;

namespace Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersMapper
    {
        public static GetUserOrdersResult MapToGetUserOrdersResult(IList<D.OrderAggregate.Order> orders, IList<D.ProductCatalogAggregate.Product> products)
        {
            return new GetUserOrdersResult
            {
                Orders = orders.Select(order => new GetUserOrdersResultOrder()
                {
                    Id = order.Id,
                    Status = order.Status,
                    TotalPrice = order.TotalPrice,
                    CreatedAt = order.CreatedAt,
                    Products = order.Products.Select(orderProduct => new GetUserOrdersResultOrderProduct()
                    {
                        Id = orderProduct.Id,
                        Price = orderProduct.Price,
                        Quantity = orderProduct.Quantity,
                        Name = orderProduct.Name,
                        Photo = products.FirstOrDefault(p => p.Id == orderProduct.ProductId)?.Photos.FirstOrDefault()
                    }).ToList(),
                }).ToList(),
            };
        }
    }
}
