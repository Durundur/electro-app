using Application.Exceptions;
using Application.Services.CartService;
using Application.Services.UserContext;
using Domain.Aggregates.CartAggregate;
using Domain.Aggregates.UserAggregate;
using HotChocolate;
using HotChocolate.Authorization;

namespace Graphql.Application.Queries
{
    public partial class Query
    {
        [Authorize]
        public async Task<List<Recipient>> GetRecipients([Service] ICartService cartService, [Service] IUserContext userContext, Guid userId, CancellationToken cancellationToken)
        {
            try
            {
                if (!userContext.IsAdmin || userContext.IsAuthenticated && userId != userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this recipients.");
                }

                var recipients = await cartService.GetUserRecipientsByUserIdAsync(userId, cancellationToken);

                return recipients;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get recipients", ex);
            }
        }

        [Authorize]
        public async Task<Cart> GetCart([Service] ICartService cartService, [Service] IUserContext userContext, Guid userId, CancellationToken cancellationToken)
        {
            try
            {
                if (!userContext.IsAdmin || userContext.IsAuthenticated && userId != userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this cart.");
                }
                var cart = await cartService.GetCartByUserIdAsync(userId, cancellationToken);

                return cart;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get user cart", ex);
            }
        }
    }
}
