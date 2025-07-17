namespace Rest.Application.Features.Order.GetOrderDetails
{
    public static class GetOrderDetailsMapper
    {
        public static GetOrderDetailsResult MapToGetOrderDetailsResult(Domain.Aggregates.OrderAggregate.Order order)
        {
            return new GetOrderDetailsResult
            {
                Id = order.Id,
                Number = order.Number,
                Status = order.Status,
                Products = order.Products.Select(orderProduct => MapToGetOrderDetailsResultProduct(orderProduct)).ToList(),
                Delivery = order.Delivery,
                Payment = order.Payment,
                Recipient = order.Recipient,
                TotalPrice = order.TotalPrice,
                UpdatedAt = order.UpdatedAt,
                CreatedAt = order.CreatedAt,
            };
        }

        public static GetOrderDetailsResultProduct MapToGetOrderDetailsResultProduct(Domain.Aggregates.OrderAggregate.OrderProduct orderProduct)
        {
            return new GetOrderDetailsResultProduct
            {
                Id = orderProduct.Id,
                ProductId = orderProduct.Product.Id,
                Name = orderProduct.Product.Name,
                Photo = orderProduct.Product.MainPhoto,
                Quantity = orderProduct.Quantity,
                Price = orderProduct.Price
            };
        }
    }
}
