using Application.Features.Shared.ProductAttribute;
using Application.Features.Shared.Pagination;
using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Features.ProductCatalog.GetSearchProducts
{
    public class GetSearchProductsResult : PaginatedResult<GetSearchProductsResultProduct>
    {
        public GetSearchProductsResult(IReadOnlyList<GetSearchProductsResultProduct> items, int count, int page, int pageSize)
            : base(items, count, page, pageSize)
        {
        }
    }

    public class GetSearchProductsResultProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Photo { get; set; }
        public ProductStatus Status { get; set; }
        public float AverageOpinionRating { get; set; }
        public int OpinionCount { get; set; }
        public IList<ProductAttributeResult> Attributes { get; set; }
        public decimal? PromotionAmount { get; set; }
        public string? PromotionCurrency { get; set; }
    }
}
