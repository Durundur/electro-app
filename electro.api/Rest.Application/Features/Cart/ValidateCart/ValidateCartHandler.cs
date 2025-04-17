using Application.Services.UserContext;
using MediatR;
using Application.Services.Models;
using Application.Services.CartService;
using Application.Exceptions;


namespace Rest.Application.Features.Cart.ValidateCart
{
    public class ValidateCartHandler : IRequestHandler<ValidateCartCommand, ValidateCartResult>
    {
        private readonly ICartService _cartService;
        private readonly IUserContext _userContext;

        public ValidateCartHandler(ICartService cartService, IUserContext userContext)
        {
            _cartService = cartService;
            _userContext = userContext;
        }

        public async Task<ValidateCartResult> Handle(ValidateCartCommand command, CancellationToken cancellationToken)
        {
            try
            {
                var model = command.Products.Select(p => new ValidateCartProductModel
                {
                    ProductId = p.ProductId,
                    Quantity = p.Quantity
                }).ToList();

                Guid? userId = _userContext.IsAuthenticated ? _userContext.UserId : null;

                var (cart, errors) = await _cartService.ValidateAndSaveCartAsync(userId, model, cancellationToken);

                return ValidateCartMapper.MapToValidateCartResult(cart, errors);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to validate cart", ex);
            }
        }
    }
}
