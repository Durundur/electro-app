using Application.Reposiotories;
using MediatR;

namespace Application.Features.Cart.GetRecipients
{
    public class GetRecipientsHandler: IRequestHandler<GetRecipientsQuery, GetRecipientsResult>
    {
        private readonly IRecipientRepository _recipientRepository;

        public GetRecipientsHandler(IRecipientRepository recipientRepository) 
        {
            _recipientRepository = recipientRepository;
        }

        public async Task<GetRecipientsResult> Handle(GetRecipientsQuery request, CancellationToken cancellationToken)
        {
            var recipients = await _recipientRepository.GetUserRecipientsAsync(request.UserId, cancellationToken);
            return GetRecipientsMapper.MapToGetRecipientsResult(recipients);
        }
    }
}
