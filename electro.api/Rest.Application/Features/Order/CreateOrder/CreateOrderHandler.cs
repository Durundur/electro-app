using MediatR;
using Application.Exceptions;
using Application.Services.UserContext;
using Application.Services.Models;
using Application.Services.OrderService;

namespace Rest.Application.Features.Order.CreateOrder
{
    public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, CreateOrderResult>
    {
        private readonly IOrderService _orderService;
        private readonly IUserContext _userContext;

        public CreateOrderHandler(IOrderService orderService, IUserContext userContext)
        {
            _orderService = orderService;
            _userContext = userContext;
        }

        public async Task<CreateOrderResult> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var orderModel = new OrderModel
                {
                    Products = request.Products.Select(p => new OrderProductModel
                    {
                        ProductId = p.ProductId,
                        Quantity = p.Quantity
                    }).ToList(),
                    PaymentMethod = request.PaymentMethod,
                    DeliveryMethod = request.DeliveryMethod,
                    Recipient = new RecipientModel
                    {
                        Type = request.Recipient.Type,
                        FirstName = request.Recipient.FirstName,
                        Surname = request.Recipient.Surname,
                        CompanyName = request.Recipient.CompanyName,
                        TaxIdentificationNumber = request.Recipient.TaxIdentificationNumber,
                        PhoneNumber = request.Recipient.PhoneNumber,
                        Street = request.Recipient.Street,
                        HouseNumber = request.Recipient.HouseNumber,
                        PostalCode = request.Recipient.PostalCode,
                        City = request.Recipient.City
                    }
                };
                var order = await _orderService.CreateOrderAsync(_userContext.UserId, orderModel, cancellationToken);

                return new CreateOrderResult
                {
                    OrderId = order.Id,
                    Status = order.Status
                };
            }
            catch (Exception ex)
            {
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
