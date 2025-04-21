using MediatR;
using Application.Services.CartService;
using Application.Exceptions;
using Application.Services.UserContext;

namespace Rest.Application.Features.Cart.GetCart
{
    public class GetCartHandler : IRequestHandler<GetCartQuery, GetCartResult>
    {
        private readonly ICartService _cartService;
        private readonly IUserContext _userContext;

        public GetCartHandler(ICartService cartService, IUserContext userContext)
        {
            _cartService = cartService;
            _userContext = userContext;
        }

        public async Task<GetCartResult> Handle(GetCartQuery query, CancellationToken cancellationToken)
        {
            try
            {
                if (!_userContext.IsAdmin || _userContext.IsAuthenticated && query.UserId != _userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this cart.");
                }

                var cart = await _cartService.GetCartByUserIdAsync(query.UserId, cancellationToken);

                return GetCartMapper.MapToGetCartResult(cart);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get user cart", ex);
            }
        }
    }
}
