using Application.Exceptions;
using Application.Services.CartService;
using MediatR;

namespace Rest.Application.Features.Cart.DeleteRecipient
{
    public class DeleteRecipientHandler : IRequestHandler<DeleteRecipientCommand, bool>
    {
        private readonly ICartService _cartService;

        public DeleteRecipientHandler(ICartService cartService)
        {
            _cartService = cartService;
        }
        public async Task<bool> Handle(DeleteRecipientCommand command, CancellationToken cancellationToken)
        {
            try
            {
                return await _cartService.DeleteRecipientAsync(command.Id, command.UserId, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to delete recipient", ex);
            }
        }
    }
}
