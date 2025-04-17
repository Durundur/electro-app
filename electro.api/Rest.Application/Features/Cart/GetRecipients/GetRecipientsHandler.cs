using Application.Services.CartService;
using MediatR;

namespace Rest.Application.Features.Cart.GetRecipients
{
    public class GetRecipientsHandler : IRequestHandler<GetRecipientsQuery, GetRecipientsResult>
    {
        private readonly ICartService _cartService;

        public GetRecipientsHandler(ICartService cartService)
        {
            _cartService = cartService;
        }

        public async Task<GetRecipientsResult> Handle(GetRecipientsQuery request, CancellationToken cancellationToken)
        {
            var recipients = await _cartService.GetUserRecipientsByUserIdAsync(request.UserId, cancellationToken);

            return GetRecipientsMapper.MapToGetRecipientsResult(recipients);
        }
    }
}
