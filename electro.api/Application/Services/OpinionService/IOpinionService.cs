using Application.Services.Models;
using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Services.OpinionService
{
    public interface IOpinionService
    {
        Task<Opinion> CreateOpinionAsync(Guid userId, OpinionModel opinion, CancellationToken cancellationToken);
        Task<Opinion> CreateOpinionReactionAsync(Guid userId, Guid productId, Guid opinionId, OpinionReactionType reactionType, CancellationToken cancellationToken);
        Task<(List<Opinion>, int totalOpinions)> GetProductOpinionsAsync(Guid productId, int page, int pageSize, int? rating, CancellationToken cancellationToken);
        Task<Opinion> GetOpinionByIdAsync(Guid opinionId, CancellationToken cancellationToken);
        Task<List<OpinionsStats>> GetProductOpinionsStatsAsync(Guid productId, CancellationToken cancellationToken);
    }
}
