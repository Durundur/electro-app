using Application.Exceptions;
using Application.Services.Models;
using Application.Services.ProductService;
using Application.Shared.Pagination;
using Domain.Aggregates.ProductCatalogAggregate;
using Graphql.Application.Queries.Inputs;
using HotChocolate;

namespace Graphql.Application.Queries
{
    public partial class Query
    {
        public async Task<Product?> GetProduct([Service] IProductService productService, Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productService.GetProductByIdAsync(id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get product", ex);
            }
        }

        public async Task<List<Product>> GetBestsellerProducts([Service] IProductService productService, int? limit = 10, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productService.GetBestsellerProductsAsync(Math.Min(limit ?? 10, 50), cancellationToken);
            }
            catch (Exception ex) 
            {
                throw new BadRequestException($"Failed to get bestseller products", ex);
            }
        }

        public async Task<List<Product>> GetFeaturedProducts([Service] IProductService productService, int? limit = 10, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productService.GetFeaturedProductsAsync(Math.Min(limit ?? 10, 50), cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get featured products", ex);
            }
        }

        public async Task<List<Product>> GetSimilarProducts([Service] IProductService productService, Guid productId, int? limit = 10, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productService.GetSimilarProductsAsync(productId, Math.Min(limit ?? 10, 20), cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get similar products", ex);
            }
        }

        public async Task<PaginatedResult<Product>> GetCatalogProducts([Service] IProductService productService, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            try
            {
                var (products, totalCount) = await productService.GetProductCatalogAsync(page, pageSize, cancellationToken);

                return new PaginatedResult<Product>(products, totalCount, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get catalog products", ex);
            }
        }

        public async Task<PaginatedResult<Product>> GetSearchProducts([Service] IProductService productService, GetSearchProductsInput input, CancellationToken cancellationToken = default)
        {
            try
            {
                var (products, totalCount) = await productService.GetSearchProductsAsync(input.Filters, input.GroupId, input.CategoryId, input.SubCategoryId,
                input.Page, input.PageSize, cancellationToken);

                return new PaginatedResult<Product>(products, totalCount, input.Page, input.PageSize);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get search products", ex);
            }
        }

        public async Task<List<SearchFilterModel>> GetProductFilters([Service] IProductService productService, int? groupId, int? categoryId, int? subCategoryId, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productService.GetSearchFiltersAsync(groupId, categoryId, subCategoryId, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get products filters", ex);
            }
        }

        public async Task<Product> GetPromotionHighlightProduct([Service] IProductService productService, CancellationToken cancellationToken = default)
        {
            try
            {
                return await productService.GetPromotionHighlightAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get promotion highlight", ex);
            }
        }
    }
}
