namespace Application.Features.ProductCatalog.GetSimilarProducts
{
    public class GetSimilarProductsResult
    {
        public IReadOnlyList<GetSimilarProductsResultProduct> Products { get; set; }
    }

    public class GetSimilarProductsResultProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Photo { get; set; }
    }
}