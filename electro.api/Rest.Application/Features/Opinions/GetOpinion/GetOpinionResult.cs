using Domain.Aggregates.ProductCatalogAggregate;

namespace Rest.Application.Features.Opinions.GetOpinion
{
    public class GetOpinionResult
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public float Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public string AuthorDisplayName { get; set; }
        public OpinionReactionType? UserReaction { get; set; }
        public int LikesCount { get; set; }
        public int DislikesCount { get; set; }
    }
}