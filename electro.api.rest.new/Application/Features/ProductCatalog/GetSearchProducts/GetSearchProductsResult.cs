using Application.Features.Shared.ProductAttribute;
using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Features.ProductCatalog.GetSearchProducts
{
    public class GetSearchProductsResult
    {
        public IList<GetSearchProductsResultProduct> Products { get; set; }
        public int PageCount { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
    }

    public class GetSearchProductsResultProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Photo { get; set; }
        public ProductStatus Status { get; set; }
        public decimal AverageOpinionRating { get; set; }
        public int OpinionCount { get; set; }
        public IList<ProductAttributeResult> Attributes { get; set; }
    }
}
