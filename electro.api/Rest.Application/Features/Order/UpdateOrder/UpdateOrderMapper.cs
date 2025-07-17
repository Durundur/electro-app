namespace Rest.Application.Features.Order.UpdateOrder
{
    public static class UpdateOrderMapper
    {
        public static UpdateOrderResult MapToUpdateOrderResult(Domain.Aggregates.OrderAggregate.Order order)
        {
            return new UpdateOrderResult
            {
                Id = order.Id,
                Number = order.Number,
                Status = order.Status,
                Products = order.Products.Select(orderProduct => MapToUpdateOrderResultProduct(orderProduct)).ToList(),
                Delivery = order.Delivery,
                Payment = order.Payment,
                Recipient = order.Recipient,
                TotalPrice = order.TotalPrice,
                UpdatedAt = order.UpdatedAt,
                CreatedAt = order.CreatedAt,
            };
        }

        public static UpdateOrderResultProduct MapToUpdateOrderResultProduct(Domain.Aggregates.OrderAggregate.OrderProduct orderProduct)
        {
            return new UpdateOrderResultProduct
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
