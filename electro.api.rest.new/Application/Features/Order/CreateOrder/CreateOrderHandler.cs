using Application.Reposiotories;
using D = Domain.Aggregates.OrderAggregate;
using Domain.ValueObjects;
using MediatR;

namespace Application.Features.Order.CreateOrder
{
    public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, CreateOrderResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateOrderHandler(IUnitOfWork unitOfWork)
        {
           _unitOfWork = unitOfWork;
        }

        public async Task<CreateOrderResult> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var orderProducts = new List<D.OrderProduct>();
            foreach (var productCommand in request.Products)
            {
                var product = await _unitOfWork.ProductRepository.GetByIdAsync(productCommand.ProductId);
                if (product == null)
                {
                    throw new InvalidOperationException($"Product with ID {productCommand.ProductId} does not exist.");
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
                orderProducts.Add(new D.OrderProduct(productCommand.ProductId, product.Name, productCommand.Quantity, new Money(product.Price.Amount, product.Price.Currency)));
            }

            var payment = new D.Payment(request.PaymentMethod, new Money((decimal)1.99, "PLN"));
            var delivery = new D.Delivery(request.DeliveryMethod, new Money((decimal)8.99, "PLN"));
            var recipient = D.Recipient.Create(request.Recipient.Type, request.Recipient.FirstName, request.Recipient.Surname, request.Recipient.CompanyName, request.Recipient.TaxIdentificationNumber, request.Recipient.PhoneNumber, request.Recipient.Street, request.Recipient.HouseNumber, request.Recipient.PostalCode, request.Recipient.City);

            var order = new D.Order(request.UserProfileId, orderProducts, payment, delivery, recipient);
            await _unitOfWork.OrderRepository.AddOrderAsync(order, cancellationToken);
            await _unitOfWork.CartRepository.DeleteUserCartAsync(request.UserProfileId);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new CreateOrderResult
            {
                OrderId = order.Id,
                Status = order.Status
            };
        }
    }
}
