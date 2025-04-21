using Application.Exceptions;
using Application.Services.Models;
using Application.Services.OpinionService;
using Application.Services.UserContext;
using Domain.Aggregates.ProductCatalogAggregate;
using Graphql.Application.Mutations.Inputs;
using HotChocolate;
using HotChocolate.Authorization;

namespace Graphql.Application.Mutations
{
    public partial class Mutation
    {
        [Authorize]
        public async Task<Opinion> CreateOpinion([Service] IOpinionService opinionService, [Service] IUserContext userContext, CreateOpinionInput input, CancellationToken cancellationToken)
        {
            if (!userContext.IsAuthenticated)
            {
                throw new UnauthorizedException("User must be authenticated to add an opinion.");
            }

            try
            {
                var opinionModel = new OpinionModel
                {
                    ProductId = input.ProductId,
                    Content = input.Content,
                    Rating = input.Rating,
                    AuthorDisplayName = input.AuthorDisplayName
                };

                var opinion = await opinionService.CreateOpinionAsync(userContext.UserId, opinionModel, cancellationToken);

                return opinion;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create opinion", ex);
            }
        }

        [Authorize]
        public async Task<Opinion> CreateOpinionReaction([Service] IOpinionService opinionService, [Service] IUserContext userContext, CreateOpinionReactionInput input, CancellationToken cancellationToken)
        {
            if (!userContext.IsAuthenticated)
            {
                throw new UnauthorizedException("User must be authenticated to react to opinions.");
            }

            try
            {
                var opinion = await opinionService.CreateOpinionReactionAsync(userContext.UserId, input.OpinionId, input.ReactionType, cancellationToken);

                return opinion;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create opinion reaction", ex);
            }
        }
    }
}
