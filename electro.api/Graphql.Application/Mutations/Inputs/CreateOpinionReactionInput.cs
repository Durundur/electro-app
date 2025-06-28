using Domain.Aggregates.ProductCatalogAggregate;

namespace Graphql.Application.Mutations.Inputs
{
    public class CreateOpinionReactionInput
    {
        public Guid ProductId { get; set; }
        public Guid OpinionId { get; set; }
        public OpinionReactionType ReactionType { get; set; }
    }
}
