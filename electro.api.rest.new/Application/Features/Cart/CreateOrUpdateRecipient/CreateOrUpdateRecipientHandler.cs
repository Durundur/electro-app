using Application.Reposiotories;
using Domain.Aggregates.UserProfileAggregate;
using MediatR;

namespace Application.Features.Cart.CreateOrUpdateRecipient
{
    public class CreateOrUpdateRecipientHandler : IRequestHandler<CreateOrUpdateRecipientCommand, CreateOrUpdateRecipientResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateOrUpdateRecipientHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CreateOrUpdateRecipientResult> Handle(CreateOrUpdateRecipientCommand request, CancellationToken cancellationToken)
        {
            Recipient recipient;
            if (request.Id.HasValue)
            {
                recipient = await _unitOfWork.RecipientRepository.GetByIdAsync(request.Id.Value, cancellationToken);
                if (recipient == null)
                {
                    throw new InvalidOperationException($"Recipient with ID {request.Id.Value} not found.");
                }

                recipient.Update(
                    request.Type,
                    request.FirstName,
                    request.Surname,
                    request.CompanyName,
                    request.TaxIdentificationNumber,
                    request.PhoneNumber,
                    request.Street,
                    request.HouseNumber,
                    request.PostalCode,
                    request.City
                );
            }
            else
            {
                recipient = Recipient.Create(
                    request.UserProfileId,
                    request.Type,
                    request.FirstName,
                    request.Surname,
                    request.CompanyName,
                    request.TaxIdentificationNumber,
                    request.PhoneNumber,
                    request.Street,
                    request.HouseNumber,
                    request.PostalCode,
                    request.City
                );

                await _unitOfWork.RecipientRepository.AddRecipientAsync(recipient, cancellationToken);
            }
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return CreateOrUpdateRecipientMapper.MapToCreateOrUpdateRecipientResult(recipient);
        }
    }
}
