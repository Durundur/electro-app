using Domain.Aggregates.ProductCatalogAggregate;

namespace Rest.Application.Features.Opinions.CreateOpinionReaction
{
    public static class CreateOpinionReactionMapper
    {
        public static CreateOpinionReactionResult MapToCreateOpinionReactionResult(Opinion opinion, OpinionReactionType userReaction)
        {
            return new CreateOpinionReactionResult
            {
                ReactionType = userReaction,
                DislikesCount = opinion.GetDislikesCount(),
                LikesCount = opinion.GetLikesCount(),
            };
        }
    }
}
