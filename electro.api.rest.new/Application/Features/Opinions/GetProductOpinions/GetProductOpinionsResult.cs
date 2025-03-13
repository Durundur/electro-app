using Application.Features.Shared.Pagination;
using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Features.Opinions.GetProductOpinions
{
    public class GetProductOpinionsResult : PaginatedResult<GetProductOpinionsResultOpinion>
    {
        public GetProductOpinionsResult(IReadOnlyList<GetProductOpinionsResultOpinion> items, int count, int page, int pageSize) 
            : base(items, count, page, pageSize)
        {
        }
    }

    public class GetProductOpinionsResultOpinion
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public float Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public string AuthorDisplayName { get; set; }
        public OpinionReactionType? ReactionType { get; set; }
        public int LikesCount { get; set; }
        public int DislikesCount { get; set; }
    }
}
