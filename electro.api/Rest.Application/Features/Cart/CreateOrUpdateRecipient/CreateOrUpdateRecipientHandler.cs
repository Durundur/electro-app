using Application.Services.CartService;
using Application.Services.Models;
using Domain.Aggregates.UserAggregate;
using MediatR;

namespace Rest.Application.Features.Cart.CreateOrUpdateRecipient
{
    public class CreateOrUpdateRecipientHandler : IRequestHandler<CreateOrUpdateRecipientCommand, CreateOrUpdateRecipientResult>
    {
        private readonly ICartService _cartService;

        public CreateOrUpdateRecipientHandler(ICartService cartService)
        {
            _cartService = cartService;
        }

        public async Task<CreateOrUpdateRecipientResult> Handle(CreateOrUpdateRecipientCommand command, CancellationToken cancellationToken)
        {
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

            var recipient = await _cartService.CreateOrUpdateRecipientAsync(recipientModel, command.Id, command.UserId,  cancellationToken);

            return CreateOrUpdateRecipientMapper.MapToCreateOrUpdateRecipientResult(recipient);
        }
    }
}
