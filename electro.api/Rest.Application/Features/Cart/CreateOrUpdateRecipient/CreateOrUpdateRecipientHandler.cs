using Application.Exceptions;
using Domain.Aggregates.UserAggregate;
using Domain.Reposiotories;
using MediatR;

namespace Rest.Application.Features.Cart.CreateOrUpdateRecipient
{
    public class CreateOrUpdateRecipientHandler : IRequestHandler<CreateOrUpdateRecipientCommand, CreateOrUpdateRecipientResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateOrUpdateRecipientHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CreateOrUpdateRecipientResult> Handle(CreateOrUpdateRecipientCommand command, CancellationToken cancellationToken)
        {
            Recipient recipient = null;
            if (command.Id.HasValue)
            {
                recipient = await _unitOfWork.RecipientRepository.GetByIdAsync(command.Id.Value, cancellationToken);
                if (recipient == null)
                {
                    throw new NotFoundException(nameof(Recipient), command.Id.Value);
                }

                recipient.Update(
                    command.Type,
                    command.FirstName,
                    command.Surname,
                    command.CompanyName,
                    command.TaxIdentificationNumber,
                    command.PhoneNumber,
                    command.Street,
                    command.HouseNumber,
                    command.PostalCode,
                    command.City
                );
            }
            else
            {
                recipient = Recipient.Create(
                    command.UserId,
                    command.Type,
                    command.FirstName,
                    command.Surname,
                    command.CompanyName,
                    command.TaxIdentificationNumber,
                    command.PhoneNumber,
                    command.Street,
                    command.HouseNumber,
                    command.PostalCode,
                    command.City
                );

                await _unitOfWork.RecipientRepository.AddRecipientAsync(recipient, cancellationToken);
            }
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return CreateOrUpdateRecipientMapper.MapToCreateOrUpdateRecipientResult(recipient);
        }
    }
}
