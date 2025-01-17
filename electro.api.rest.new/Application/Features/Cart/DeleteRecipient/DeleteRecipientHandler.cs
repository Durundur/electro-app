using Application.Reposiotories;
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
        public async Task<bool> Handle(DeleteRecipientCommand request, CancellationToken cancellationToken)
        {
            var recipient = await _unitOfWork.RecipientRepository.GetByIdAsync(request.Id, cancellationToken);

            if (recipient == null)
            {
                throw new Exception($"Recipient with ID {request.Id} not found");
            }

            if (recipient.UserProfileId != request.UserProfileId)
            {
                throw new InvalidOperationException("You are not authorized to delete this recipient.");
            }

            _unitOfWork.RecipientRepository.DeleteRecipient(recipient);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
