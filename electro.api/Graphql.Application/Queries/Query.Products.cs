using Application.Services.ProductService;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using HotChocolate;

namespace Graphql.Application.Queries
{
    public partial class Query
    {
        public async Task<Product?> GetProduct([Service] IUnitOfWork unitOfWork, Guid id, CancellationToken cancellationToken)
        {
            return await unitOfWork.ProductRepository.GetByIdAsync(id, cancellationToken);
        }

        public async Task<List<Product>> GetBestsellerProducts([Service] IProductService productService, int? limit = 10, CancellationToken cancellationToken = default)
        {
            return await productService.GetBestsellerProductsAsync(Math.Min(limit ?? 10, 50), cancellationToken);
        }

        public async Task<List<Product>> GetFeaturedProducts([Service] IProductService productService, int? limit = 10, CancellationToken cancellationToken = default)
        {
            return await productService.GetFeaturedProductsAsync(Math.Min(limit ?? 10, 50), cancellationToken);
        }

        public async Task<List<Product>> GetSimilarProducts([Service] IProductService productService, Guid productId, int? limit = 10, CancellationToken cancellationToken = default)
        {
            return await productService.GetSimilarProductsAsync(productId, Math.Min(limit ?? 10, 20), cancellationToken);
        }
    }
}
