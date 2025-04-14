using Application.Exceptions;
using Application.Services.UserContext;
using Domain.Aggregates.OrderAggregate;
using Domain.Reposiotories;
using MediatR;

namespace Rest.Application.Features.Order.UpdateOrder
{
    public class UpdateOrderHandler : IRequestHandler<UpdateOrderCommand, UpdateOrderResult>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserContext _userContext;

        public UpdateOrderHandler(IUnitOfWork unitOfWork, IUserContext userContext)
        {
            _unitOfWork = unitOfWork;
            _userContext = userContext;
        }

        public async Task<UpdateOrderResult> Handle(UpdateOrderCommand command, CancellationToken cancellationToken)
        {
            var order = await _unitOfWork.OrderRepository.GetOrderByIdAsync(command.OrderId, cancellationToken);

            if (order == null)
            {
                throw new NotFoundException(nameof(Order), command.OrderId);
            }

            if (command.Recipient != null)
            {
                var allowedStatuses = new[] { OrderStatus.Created, OrderStatus.Processing, OrderStatus.Paid };
                if (allowedStatuses.Contains(order.Status))
                {
                    order.UpdateRecipient(
                        command.Recipient.Type,
                        command.Recipient.FirstName,
                        command.Recipient.Surname,
                        command.Recipient.CompanyName,
                        command.Recipient.TaxIdentificationNumber,
                        command.Recipient.PhoneNumber,
                        command.Recipient.Street,
                        command.Recipient.HouseNumber,
                        command.Recipient.PostalCode,
                        command.Recipient.City
                    );
                }
            }

            if (!string.IsNullOrWhiteSpace(command.TrackingNumber))
            {
                if (order.Status != OrderStatus.Processing || command.Status != OrderStatus.Shipped)
                {
                    throw new InvalidOperationException("Tracking number can only be set when changing status from Processing to Shipped");
                }

                order.UpdateTrackingNumber(command.TrackingNumber);
            }

            order.UpdateStatus(command.Status);

            await _unitOfWork.SaveChangesAsync();

            var productsIds = order.Products.Select(x => x.ProductId);
            var productCatalog = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(productsIds);

            return UpdateOrderMapper.MapToUpdateOrderResult(order, productCatalog);
        }
    }
}
