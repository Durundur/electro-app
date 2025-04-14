using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Services.ProductService
{
    public interface IProductService
    {
        Task<List<Product>> GetBestsellerProductsAsync(int limit, CancellationToken cancellationToken);
        Task<List<Product>> GetSimilarProductsAsync(Guid productId, int limit, CancellationToken cancellationToken);
        Task<List<Product>> GetFeaturedProductsAsync(int limit, CancellationToken cancellationToken);
    }
}