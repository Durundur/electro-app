using Application.Exceptions;
using Application.Features.Order.GetOrderDetails;
using Application.Services.UserContext;
using Domain.Reposiotories;
using MediatR;

namespace Application.Features.Order.UpdateOrder
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

            if (command.Status.HasValue)
            {
                order.UpdateStatus(command.Status.Value);
            }

            if (!string.IsNullOrWhiteSpace(command.TrackingNumber))
            {
                order.UpdateTrackingNumber(command.TrackingNumber);
            }

            if (command.Recipient != null)
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

            await _unitOfWork.SaveChangesAsync();

            var productsIds = order.Products.Select(x => x.ProductId);
            var productCatalog = await _unitOfWork.ProductRepository.GetProductsByIdsAsync(productsIds);

            return UpdateOrderMapper.MapToUpdateOrderResult(order, productCatalog);
        }
    }
}
