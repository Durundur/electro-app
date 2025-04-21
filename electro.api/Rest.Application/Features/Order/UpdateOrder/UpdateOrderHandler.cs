using Application.Exceptions;
using Application.Services.Models;
using Application.Services.OrderService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Order.UpdateOrder
{
    public class UpdateOrderHandler : IRequestHandler<UpdateOrderCommand, UpdateOrderResult>
    {
        private readonly IOrderService _orderService;

        public UpdateOrderHandler(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<UpdateOrderResult> Handle(UpdateOrderCommand command, CancellationToken cancellationToken)
        {
            try
            {
                var recipientModel = new RecipientModel
                {
                    Type = command.Recipient.Type,
                    FirstName = command.Recipient.FirstName,
                    Surname = command.Recipient.Surname,
                    CompanyName = command.Recipient.CompanyName,
                    TaxIdentificationNumber = command.Recipient.TaxIdentificationNumber,
                    PhoneNumber = command.Recipient.PhoneNumber,
                    Street = command.Recipient.Street,
                    HouseNumber = command.Recipient.HouseNumber,
                    PostalCode = command.Recipient.PostalCode,
                    City = command.Recipient.City
                };

                var order = await _orderService.UpdateOrderAsync(command.OrderId, command.Status, command.TrackingNumber, recipientModel, cancellationToken);

                return UpdateOrderMapper.MapToUpdateOrderResult(order);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to update order", ex);
            }
        }
    }
}
