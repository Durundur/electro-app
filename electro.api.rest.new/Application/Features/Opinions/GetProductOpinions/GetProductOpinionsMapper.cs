namespace Application.Features.Opinions.GetProductOpinions
{
    public static class GetProductOpinionsMapper
    {
        public static IEnumerable<GetProductOpinionsResultOpinion> MapToGetGetProductOpinionsResultOpinion(IList<Domain.Aggregates.ProductCatalogAggregate.Opinion> opinions, Guid? userId = null)
        {
            return opinions.Select(o => new GetProductOpinionsResultOpinion
            {
                Id = o.Id,
                Content = o.Content,
                Rating = o.Rating,
                CreatedAt = o.CreatedAt,
                AuthorDisplayName = o.AuthorDisplayName,
                LikesCount = o.GetLikesCount(),
                DislikesCount = o.GetDislikesCount(),
                ReactionType = userId.HasValue ? o.GetUserReaction(userId.Value) : null
            });
        }
    }
}
