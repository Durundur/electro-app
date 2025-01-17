namespace Application.Features.Order.GetOrderDetails
{
    public static class GetOrderDetailsMapper
    {
        public static GetOrderDetailsResult MapToGetOrderDetailsResult(Domain.Aggregates.OrderAggregate.Order order, IList<Domain.Aggregates.ProductCatalogAggregate.Product> productCatalog)
        {
            return new GetOrderDetailsResult
            {
                Id = order.Id,
                Status = order.Status,
                Products = order.Products
                    .Select(orderProduct =>
                    {
                        var product = productCatalog.First(p => p.Id == orderProduct.ProductId);
                        return MapToGetOrderDetailsResultProduct(orderProduct, product);
                    })
                    .ToList(),
                Delivery = order.Delivery,
                Payment = order.Payment,
                Recipient = order.Recipient,
                TotalPrice = order.TotalPrice,
                UpdatedAt = order.UpdatedAt,
                CreatedAt = order.CreatedAt,
            };
        }

        public static GetOrderDetailsResultProduct MapToGetOrderDetailsResultProduct(Domain.Aggregates.OrderAggregate.OrderProduct orderProduct, Domain.Aggregates.ProductCatalogAggregate.Product product)
        {
            return new GetOrderDetailsResultProduct{
                Id = orderProduct.Id,
                ProductId = product.Id,
                Name = product.Name,
                Photo = product.Photos.FirstOrDefault(),
                Quantity = orderProduct.Quantity,
                Price = orderProduct.Price
            };
        }
    }
}
