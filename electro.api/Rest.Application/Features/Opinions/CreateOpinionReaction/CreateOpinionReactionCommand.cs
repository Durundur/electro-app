using Domain.Aggregates.ProductCatalogAggregate;
using MediatR;

namespace Rest.Application.Features.Opinions.CreateOpinionReaction
{
    public class CreateOpinionReactionCommand : IRequest<CreateOpinionReactionResult>
    {
        public Guid OpinionId { get; set; }
        public OpinionReactionType ReactionType { get; set; }
    }
}
