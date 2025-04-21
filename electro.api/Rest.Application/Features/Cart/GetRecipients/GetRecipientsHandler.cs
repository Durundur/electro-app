using Application.Exceptions;
using Application.Services.CartService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Cart.GetRecipients
{
    public class GetRecipientsHandler : IRequestHandler<GetRecipientsQuery, GetRecipientsResult>
    {
        private readonly ICartService _cartService;
        private readonly IUserContext _userContext;

        public GetRecipientsHandler(ICartService cartService, IUserContext userContext)
        {
            _cartService = cartService;
            _userContext = userContext;
        }

        public async Task<GetRecipientsResult> Handle(GetRecipientsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                if (!_userContext.IsAdmin || _userContext.IsAuthenticated && request.UserId != _userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this recipients.");
                }

                var recipients = await _cartService.GetUserRecipientsByUserIdAsync(request.UserId, cancellationToken);

                return GetRecipientsMapper.MapToGetRecipientsResult(recipients);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get recipients", ex);
            }
        }
    }
}
