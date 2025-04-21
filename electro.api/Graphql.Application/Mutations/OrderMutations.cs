using Application.Exceptions;
using Application.Services.Models;
using Application.Services.OrderService;
using Application.Services.UserContext;
using Domain.Aggregates.OrderAggregate;
using Graphql.Application.Mutations.Inputs;
using HotChocolate;
using HotChocolate.Authorization;

namespace Graphql.Application.Mutations
{
    public partial class Mutation
    {
        [Authorize]
        public async Task<Order> CreateOrder([Service] IOrderService orderService, [Service] IUserContext userContext, CreateOrderInput input, CancellationToken cancellationToken)
        {
            if (!userContext.IsAuthenticated)
            {
                throw new UnauthorizedException("User must be authenticated to create order.");
            }

            try
            {
                var orderModel = new OrderModel
                {
                    Products = input.Products.Select(p => new OrderProductModel
                    {
                        ProductId = p.ProductId,
                        Quantity = p.Quantity
                    }).ToList(),
                    PaymentMethod = input.PaymentMethod,
                    DeliveryMethod = input.DeliveryMethod,
                    Recipient = new RecipientModel
                    {
                        Type = input.Recipient.Type,
                        FirstName = input.Recipient.FirstName,
                        Surname = input.Recipient.Surname,
                        CompanyName = input.Recipient.CompanyName,
                        TaxIdentificationNumber = input.Recipient.TaxIdentificationNumber,
                        PhoneNumber = input.Recipient.PhoneNumber,
                        Street = input.Recipient.Street,
                        HouseNumber = input.Recipient.HouseNumber,
                        PostalCode = input.Recipient.PostalCode,
                        City = input.Recipient.City
                    }
                };
                var order = await orderService.CreateOrderAsync(userContext.UserId, orderModel, cancellationToken);

                return order;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create order", ex);
            }
        }

        [Authorize(Roles = ["Admin"])]
        public async Task<Order> UpdateOrder([Service] IOrderService orderService, [Service] IUserContext userContext, UpdateOrderInput input, CancellationToken cancellationToken)
        {
            try
            {
                var recipientModel = new RecipientModel
                {
                    Type = input.Recipient.Type,
                    FirstName = input.Recipient.FirstName,
                    Surname = input.Recipient.Surname,
                    CompanyName = input.Recipient.CompanyName,
                    TaxIdentificationNumber = input.Recipient.TaxIdentificationNumber,
                    PhoneNumber = input.Recipient.PhoneNumber,
                    Street = input.Recipient.Street,
                    HouseNumber = input.Recipient.HouseNumber,
                    PostalCode = input.Recipient.PostalCode,
                    City = input.Recipient.City
                };
                var order = await orderService.UpdateOrderAsync(input.OrderId, input.Status, input.TrackingNumber, recipientModel, cancellationToken);

                return order;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to update order", ex);
            }
        }
    }
}
