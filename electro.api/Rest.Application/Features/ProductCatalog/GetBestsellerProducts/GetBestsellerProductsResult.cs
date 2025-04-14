using Domain.ValueObjects;

namespace Rest.Application.Features.ProductCatalog.GetBestsellerProducts
{
    public class GetBestsellerProductsResult
    {
        public IList<GetBestsellerProductsResultProduct> Products { get; set; }
    }

    public class GetBestsellerProductsResultProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Photo { get; set; }
        public Money? Promotion { get; set; }
    }
}