using Application.Exceptions;
using Application.Services.CartService;
using Application.Services.Models;
using Application.Services.UserContext;
using Domain.Aggregates.UserAggregate;
using Graphql.Application.Mutations.Inputs;
using Graphql.Application.Mutations.Types;
using HotChocolate;
using HotChocolate.Authorization;

namespace Graphql.Application.Mutations
{
    public partial class Mutation
    {
        [Authorize]
        public async Task<bool> DeleteRecipient([Service] ICartService cartService, [Service] IUserContext userContext, Guid userId, Guid recipientId, CancellationToken cancellationToken)
        {
            try
            {
                if (!userContext.IsAdmin || userContext.IsAuthenticated && userId != userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this recipients.");
                }

                return await cartService.DeleteRecipientAsync(recipientId, userId, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to delete recipient", ex);
            }
        }

        [Authorize]
        public async Task<Recipient> CreateOrUpdateRecipient([Service] ICartService cartService, [Service] IUserContext userContext, CreateOrUpdateRecipientInput input, CancellationToken cancellationToken)
        {
            try
            {
                if (!userContext.IsAdmin || userContext.IsAuthenticated && input.UserId != userContext.UserId)
                {
                    throw new UnauthorizedException("You do not have permission to access this recipients.");
                }

                var recipientModel = new RecipientModel
                {
                    FirstName = input.FirstName,
                    Surname = input.Surname,
                    CompanyName = input.CompanyName,
                    TaxIdentificationNumber = input.TaxIdentificationNumber,
                    Type = input.Type,
                    PhoneNumber = input.PhoneNumber,
                    Street = input.Street,
                    HouseNumber = input.HouseNumber,
                    PostalCode = input.PostalCode,
                    City = input.City
                };
                var recipient = await cartService.CreateOrUpdateRecipientAsync(recipientModel, input.Id, input.UserId, cancellationToken);

                return recipient;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update recipient", ex);
            }
        }

        public async Task<ValidateCartType> ValidateCart([Service] ICartService cartService, [Service] IUserContext userContext, ValidateCartInput input, CancellationToken cancellationToken)
        {
            try
            {
                var model = input.Products.Select(p => new ValidateCartProductModel
                {
                    ProductId = p.ProductId,
                    Quantity = p.Quantity
                }).ToList();

                Guid? userId = userContext.IsAuthenticated ? userContext.UserId : null;

                var (cart, errors) = await cartService.ValidateAndSaveCartAsync(userId, model, cancellationToken);

                return new ValidateCartType
                {
                    Cart = cart,
                    Errors = errors
                };
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to validate cart", ex);
            }
        }
    }
}
