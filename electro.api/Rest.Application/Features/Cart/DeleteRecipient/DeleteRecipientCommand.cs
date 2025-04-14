using MediatR;

namespace Rest.Application.Features.Cart.DeleteRecipient
{
    public class DeleteRecipientCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
    }
}
