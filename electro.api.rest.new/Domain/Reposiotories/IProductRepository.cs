using Domain.Aggregates.ProductCatalogAggregate;

namespace Domain.Reposiotories
{
    public interface IProductRepository
    {
        Task<Product> GetByIdWithLockAsync(Guid id, CancellationToken cancellationToken = default);
        Task<Product> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<IList<Product>> GetProductsByIdsAsync(IEnumerable<Guid> productsIds, CancellationToken cancellationToken = default);
        Task<IList<Product>> GetProductsByIdsWithLockAsync(IEnumerable<Guid> productsIds, CancellationToken cancellationToken = default);
        IQueryable<Product> GetProductsQuery();
        Task<Product> AddProductAsync(Product product, CancellationToken cancellationToken = default);
    }
}
