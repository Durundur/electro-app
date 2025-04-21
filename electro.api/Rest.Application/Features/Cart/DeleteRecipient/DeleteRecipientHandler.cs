using Application.Exceptions;
using Application.Services.CartService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Cart.DeleteRecipient
{
    public class DeleteRecipientHandler : IRequestHandler<DeleteRecipientCommand, bool>
    {
        private readonly ICartService _cartService;
        private readonly IUserContext _userContext;

        public DeleteRecipientHandler(ICartService cartService, IUserContext userContext)
        {
            _cartService = cartService;
            _userContext = userContext;
        }
        public async Task<bool> Handle(DeleteRecipientCommand command, CancellationToken cancellationToken)
        {
            try
            {
                if (!_userContext.IsAdmin || _userContext.IsAuthenticated && command.UserId != _userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this recipients.");
                }

                return await _cartService.DeleteRecipientAsync(command.Id, command.UserId, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to delete recipient", ex);
            }
        }
    }
}
