using Domain.Reposiotories;
using Domain.Aggregates.OrderAggregate;
using Domain.ValueObjects;
using MediatR;
using Application.Services.UserContext;
using Application.Exceptions;

namespace Application.Features.Order.CreateOrder
{
    public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, CreateOrderResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;

        public CreateOrderHandler(IUnitOfWork unitOfWork, IUserContext userContext)
        {
           _unitOfWork = unitOfWork;
            _userContext = userContext;
        }

        public async Task<CreateOrderResult> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var orderProducts = new List<OrderProduct>();
            foreach (var productCommand in request.Products)
            {
                var product = await _unitOfWork.ProductRepository.GetByIdAsync(productCommand.ProductId);
                if (product == null)
                {
                    throw new NotFoundException(nameof(OrderProduct), productCommand.ProductId);
                }
                if (product.StockQuantity < productCommand.Quantity)
                {
                    throw new InvalidOperationException($"Insufficient stock for product {product.Name}. Requested: {productCommand.Quantity}");
                }
                if (product.Price.Amount != productCommand.Price.Amount || product.Price.Currency != productCommand.Price.Currency)
                {
                    throw new InvalidOperationException($"Product price mismatch for product ID {productCommand.ProductId}.");
                }
                product.UpdateStockQuantity(product.StockQuantity - productCommand.Quantity);
                orderProducts.Add(new OrderProduct(productCommand.ProductId, product.Name, productCommand.Quantity, new Money(product.Price.Amount, product.Price.Currency)));
            }

            var payment = new Payment(request.PaymentMethod, new Money((decimal)1.99, "PLN"));
            var delivery = new Delivery(request.DeliveryMethod, new Money((decimal)8.99, "PLN"));
            var recipient = Recipient.Create(request.Recipient.Type, request.Recipient.FirstName, request.Recipient.Surname, request.Recipient.CompanyName, request.Recipient.TaxIdentificationNumber, request.Recipient.PhoneNumber, request.Recipient.Street, request.Recipient.HouseNumber, request.Recipient.PostalCode, request.Recipient.City);

            var order = new Domain.Aggregates.OrderAggregate.Order(_userContext.UserId, orderProducts, payment, delivery, recipient);
            await _unitOfWork.OrderRepository.AddOrderAsync(order, cancellationToken);
            await _unitOfWork.CartRepository.DeleteUserCartAsync(_userContext.UserId);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new CreateOrderResult
            {
                OrderId = order.Id,
                Status = order.Status
            };
        }
    }
}
