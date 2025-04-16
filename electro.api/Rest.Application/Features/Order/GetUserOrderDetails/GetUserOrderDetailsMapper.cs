namespace Rest.Application.Features.Order.GetUserOrderDetails
{
    public static class GetUserOrderDetailsMapper
    {
        public static GetUserOrderDetailsResult MapToGetUserOrderDetailsResult(Domain.Aggregates.OrderAggregate.Order order)
        {
            return new GetUserOrderDetailsResult()
            {
                Id = order.Id,
                Number = order.Number,
                Status = order.Status,
                Products = order.Products.Select(op => MapToGetUserOrderDetailsResultProduct(op)).ToList(),
                Delivery = order.Delivery,
                Payment = order.Payment,
                Recipient = order.Recipient,
                TotalPrice = order.TotalPrice,
                UpdatedAt = order.UpdatedAt,
                CreatedAt = order.CreatedAt,
            };
        }

        public static GetUserOrderDetailsResultProduct MapToGetUserOrderDetailsResultProduct(Domain.Aggregates.OrderAggregate.OrderProduct orderProduct)
        {
            return new GetUserOrderDetailsResultProduct
            {
                Id = orderProduct.Id,
                ProductId = orderProduct.Product.Id,
                Name = orderProduct.Product.Name,
                Photo = orderProduct.Product.Photos.FirstOrDefault(),
                Quantity = orderProduct.Quantity,
                Price = orderProduct.Price
            };
        }
    }
}
