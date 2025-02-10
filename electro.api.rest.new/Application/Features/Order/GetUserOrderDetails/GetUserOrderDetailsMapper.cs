namespace Application.Features.Order.GetUserOrderDetails
{
    public static class GetUserOrderDetailsMapper
    {
        public static GetUserOrderDetailsResult MapToGetUserOrderDetailsResult(Domain.Aggregates.OrderAggregate.Order order, IList<Domain.Aggregates.ProductCatalogAggregate.Product> products)
        {
            return new GetUserOrderDetailsResult()
            {
                Id = order.Id,
                Number = order.Number,
                Status = order.Status,
                Products = order.Products
                    .Select(orderProduct =>
                    {
                        var product = products.FirstOrDefault(p => p.Id == orderProduct.ProductId);
                        return MapToGetUserOrderDetailsResultProduct(orderProduct, product);
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

        public static GetUserOrderDetailsResultProduct MapToGetUserOrderDetailsResultProduct(Domain.Aggregates.OrderAggregate.OrderProduct orderProduct, Domain.Aggregates.ProductCatalogAggregate.Product product)
        {
            return new GetUserOrderDetailsResultProduct
            {
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
