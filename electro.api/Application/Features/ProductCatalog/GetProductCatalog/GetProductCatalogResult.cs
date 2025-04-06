using Application.Features.Shared.Pagination;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.ValueObjects;

namespace Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogResult : PaginatedResult<GetProductCatalogResultProduct>
    {
        public GetProductCatalogResult(IReadOnlyList<GetProductCatalogResultProduct> items, int count, int page, int pageSize) 
            : base(items, count, page, pageSize)
        {
        }
    }

    public class GetProductCatalogResultProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Money Price { get; set; }
        public string Photo { get; set; }
        public ProductStatus Status { get; set; }
        public int StockQuantity { get; set; }
    }
}
