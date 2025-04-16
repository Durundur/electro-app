using Domain.Aggregates.ProductCatalogAggregate;

namespace Domain.Reposiotories
{
    public interface IOpinionRepository
    {
        IQueryable<Opinion> GetOpinionsQuery();
        Task<Opinion> AddOpinionAsync(Opinion opinion, CancellationToken cancellationToken = default);
        Task<Opinion> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
