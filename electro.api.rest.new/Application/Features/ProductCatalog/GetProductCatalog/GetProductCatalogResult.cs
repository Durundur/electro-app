using Domain.Aggregates.ProductCatalogAggregate;
using Domain.ValueObjects;

namespace Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogResult
    {
        public IList<GetProductCatalogResultProduct> Products { get; set; }
        public int PageCount { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
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
