using MediatR;
using Application.Services.CartService;
using Application.Exceptions;

namespace Rest.Application.Features.Cart.GetCart
{
    public class GetCartHandler : IRequestHandler<GetCartQuery, GetCartResult>
    {
        private readonly ICartService _cartService;

        public GetCartHandler(ICartService cartService)
        {
            _cartService = cartService;
        }

        public async Task<GetCartResult> Handle(GetCartQuery query, CancellationToken cancellationToken)
        {
            try
            {
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
