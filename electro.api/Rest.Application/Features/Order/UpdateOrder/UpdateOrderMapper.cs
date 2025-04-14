namespace Rest.Application.Features.Order.UpdateOrder
{
    public static class UpdateOrderMapper
    {
        public static UpdateOrderResult MapToUpdateOrderResult(Domain.Aggregates.OrderAggregate.Order order, IList<Domain.Aggregates.ProductCatalogAggregate.Product> productCatalog)
        {
            return new UpdateOrderResult
            {
                Id = order.Id,
                Number = order.Number,
                Status = order.Status,
                Products = order.Products
                    .Select(orderProduct =>
                    {
                        var product = productCatalog.First(p => p.Id == orderProduct.ProductId);
                        return MapToUpdateOrderResultProduct(orderProduct, product);
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

        public static UpdateOrderResultProduct MapToUpdateOrderResultProduct(Domain.Aggregates.OrderAggregate.OrderProduct orderProduct, Domain.Aggregates.ProductCatalogAggregate.Product product)
        {
            return new UpdateOrderResultProduct
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
