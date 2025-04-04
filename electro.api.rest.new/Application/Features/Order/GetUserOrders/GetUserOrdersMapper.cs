﻿using D = Domain.Aggregates;

namespace Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersMapper
    {
        public static IList<GetUserOrdersResultOrder> MapToGetUserOrders(IList<D.OrderAggregate.Order> orders, IList<D.ProductCatalogAggregate.Product> products)
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
                    ProductId = orderProduct.ProductId,
                    Price = orderProduct.Price,
                    Quantity = orderProduct.Quantity,
                    Name = orderProduct.Name,
                    Photo = products.FirstOrDefault(p => p.Id == orderProduct.ProductId)?.Photos.FirstOrDefault()
                }).ToList(),
            }).ToList();
        }
    }
}
