using Domain.Reposiotories;
using Domain.Aggregates.OrderAggregate;
using Domain.ValueObjects;
using MediatR;
using Application.Services.UserContext;
using Application.Exceptions;
using Microsoft.Extensions.Logging;

namespace Application.Features.Order.CreateOrder
{
    public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, CreateOrderResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;
        private readonly ILogger<CreateOrderHandler> _logger;

        public CreateOrderHandler(IUnitOfWork unitOfWork, IUserContext userContext, ILogger<CreateOrderHandler> logger)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
            _logger = logger;
        }

        public async Task<CreateOrderResult> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync(cancellationToken: cancellationToken);

                var productIds = request.Products.Select(p => p.ProductId).OrderBy(id => id).ToList();
                var products = await _unitOfWork.ProductRepository.GetProductsByIdsWithLockAsync(productIds, cancellationToken);

                var orderProducts = new List<OrderProduct>();

                foreach (var productCommand in request.Products)
                {
                    var product = products.FirstOrDefault(p => p.Id == productCommand.ProductId);

                    if (product == null)
                    {
                        throw new NotFoundException(nameof(OrderProduct), productCommand.ProductId);
                    }

                    if (product.StockQuantity < productCommand.Quantity)
                    {
                        throw new InvalidOperationException($"Insufficient stock for product {product.Name}. Requested: {productCommand.Quantity}");
                    }

                    product.UpdateStockQuantity(product.StockQuantity - productCommand.Quantity);

                    var orderProduct = OrderProduct.Create(
                        productCommand.ProductId,
                        product.Name,
                        productCommand.Quantity,
                        product.EffectivePrice
                    );
                    orderProducts.Add(orderProduct);
                }

                var payment = Payment.Create(request.PaymentMethod, new Money((decimal)1.99, "PLN"));
                var delivery = Delivery.Create(request.DeliveryMethod, new Money((decimal)8.99, "PLN"));
                var recipient = Recipient.Create(
                    request.Recipient.Type,
                    request.Recipient.FirstName,
                    request.Recipient.Surname,
                    request.Recipient.CompanyName,
                    request.Recipient.TaxIdentificationNumber,
                    request.Recipient.PhoneNumber,
                    request.Recipient.Street,
                    request.Recipient.HouseNumber,
                    request.Recipient.PostalCode,
                    request.Recipient.City
                );

                var order = Domain.Aggregates.OrderAggregate.Order.Create(
                    _userContext.UserId,
                    orderProducts,
                    payment,
                    delivery,
                    recipient
                );

                await _unitOfWork.OrderRepository.AddOrderAsync(order, cancellationToken);

                await _unitOfWork.CartRepository.DeleteUserCartAsync(_userContext.UserId, cancellationToken);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync(cancellationToken);

                return new CreateOrderResult
                {
                    OrderId = order.Id,
                    Status = order.Status
                };
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync(cancellationToken);
                _logger.LogError(ex, "An error occurred while creating order");
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
