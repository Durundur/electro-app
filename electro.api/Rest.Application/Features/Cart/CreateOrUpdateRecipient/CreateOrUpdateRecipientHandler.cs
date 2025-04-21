using Application.Exceptions;
using Application.Services.CartService;
using Application.Services.Models;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Cart.CreateOrUpdateRecipient
{
    public class CreateOrUpdateRecipientHandler : IRequestHandler<CreateOrUpdateRecipientCommand, CreateOrUpdateRecipientResult>
    {
        private readonly ICartService _cartService;
        private readonly IUserContext _userContext;

        public CreateOrUpdateRecipientHandler(ICartService cartService, IUserContext userContext)
        {
            _cartService = cartService;
            _userContext = userContext;
        }

        public async Task<CreateOrUpdateRecipientResult> Handle(CreateOrUpdateRecipientCommand command, CancellationToken cancellationToken)
        {
            try
            {
                if (!_userContext.IsAdmin || _userContext.IsAuthenticated && command.UserId != _userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this recipients.");
                }

                var recipientModel = new RecipientModel
                {
                    FirstName = command.FirstName,
                    Surname = command.Surname,
                    CompanyName = command.CompanyName,
                    TaxIdentificationNumber = command.TaxIdentificationNumber,
                    Type = command.Type,
                    PhoneNumber = command.PhoneNumber,
                    Street = command.Street,
                    HouseNumber = command.HouseNumber,
                    PostalCode = command.PostalCode,
                    City = command.City
                };

                var recipient = await _cartService.CreateOrUpdateRecipientAsync(recipientModel, command.Id, command.UserId, cancellationToken);

                return CreateOrUpdateRecipientMapper.MapToCreateOrUpdateRecipientResult(recipient);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update recipient", ex);
            }
        }
    }
}
