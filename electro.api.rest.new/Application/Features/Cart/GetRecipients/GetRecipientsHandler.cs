using Domain.Reposiotories;
using MediatR;

namespace Application.Features.Cart.GetRecipients
{
    public class GetRecipientsHandler: IRequestHandler<GetRecipientsQuery, GetRecipientsResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetRecipientsHandler(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetRecipientsResult> Handle(GetRecipientsQuery request, CancellationToken cancellationToken)
        {
            var recipients = await _unitOfWork.RecipientRepository.GetUserRecipientsAsync(request.UserId, cancellationToken);
            return GetRecipientsMapper.MapToGetRecipientsResult(recipients);
        }
    }
}
