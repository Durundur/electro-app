namespace Application.Features.ProductCatalog.GetFeaturedProducts
{
    public class GetFeaturedProductsResult
    {
        public IList<GetFeaturedProductsResultProduct> Products { get; set; }
    }

    public class GetFeaturedProductsResultProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Photo { get; set; }
        public decimal? PromotionAmount { get; set; }
        public string? PromotionCurrency { get; set; }
    }
}