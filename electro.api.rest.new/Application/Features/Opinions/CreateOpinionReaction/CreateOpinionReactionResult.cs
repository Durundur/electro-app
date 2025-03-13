using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Features.Opinions.CreateOpinionReaction
{
    public class CreateOpinionReactionResult
    {
        public OpinionReactionType ReactionType { get; set; }
        public int LikesCount { get; set; }
        public int DislikesCount { get; set; }
    }
}
