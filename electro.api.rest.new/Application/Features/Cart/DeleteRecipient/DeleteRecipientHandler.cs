using Domain.Reposiotories;
using MediatR;

namespace Application.Features.Cart.DeleteRecipient
{
    public class DeleteRecipientHandler : IRequestHandler<DeleteRecipientCommand, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteRecipientHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> Handle(DeleteRecipientCommand command, CancellationToken cancellationToken)
        {
            var recipient = await _unitOfWork.RecipientRepository.GetByIdAsync(command.Id, cancellationToken);

            if (recipient == null)
            {
                throw new Exception($"Recipient with ID {command.Id} not found");
            }

            await _unitOfWork.RecipientRepository.DeleteRecipientAsync(recipient.Id, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
