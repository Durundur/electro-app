using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Features.Opinions.GetOpinion
{
    public static class GetOpinionMapper
    {
        public static GetOpinionResult MapToGetOpinionResult(Opinion opinion, Guid? userId = null)
        {
            return new GetOpinionResult
            {
                Id = opinion.Id,
                Content = opinion.Content,
                Rating = opinion.Rating,
                CreatedAt = opinion.CreatedAt,
                AuthorDisplayName = opinion.AuthorDisplayName,
                UserReaction = userId.HasValue ? opinion.GetUserReaction(userId.Value) : null,
                LikesCount = opinion.GetLikesCount(),
                DislikesCount = opinion.GetDislikesCount()
            };
        }
    }
}