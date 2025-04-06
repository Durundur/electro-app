using MediatR;

namespace Application.Features.Cart.GetRecipients
{
    public class GetRecipientsQuery : IRequest<GetRecipientsResult>
    {
        public Guid UserId { get; set; }
    }
}
