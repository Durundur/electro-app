using MediatR;

namespace Rest.Application.Features.Cart.GetCart
{
    public class GetCartQuery : IRequest<GetCartResult>
    {
        public Guid UserId { get; set; }
    }
}
