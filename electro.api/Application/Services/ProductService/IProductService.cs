using Application.Services.Models;
using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Services.ProductService
{
    public interface IProductService
    {
        Task<List<Product>> GetBestsellerProductsAsync(int limit, CancellationToken cancellationToken = default);
        Task<List<Product>> GetSimilarProductsAsync(Guid productId, int limit, CancellationToken cancellationToken = default);
        Task<List<Product>> GetFeaturedProductsAsync(int limit, CancellationToken cancellationToken = default);
        Task<(List<Product> Products, int TotalCount)> GetSearchProductsAsync(Dictionary<string, string[]> filters, int? groupId, int? categoryId, int? subCategoryId, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
        Task<List<SearchFilterModel>> GetSearchFiltersAsync(int? groupId, int? categoryId, int? subCategoryId, CancellationToken cancellationToken = default);
        Task<Product> GetPromotionHighlightAsync(CancellationToken cancellationToken = default);
        Task<(List<Product> Products, int TotalCount)> GetProductCatalog(int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
        Task<Product> CreateOrUpdateProductAsync(ProductModel model, CancellationToken cancellationToken = default);
        Task<Product> GetProductByIdAsync(Guid productId, CancellationToken cancellationToken = default);
    }
}