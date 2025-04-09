using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Features.ProductCatalog.GetSimilarProducts
{
    public static class GetSimilarProductsMapper
    {
        public static GetSimilarProductsResult MapToGetSimilarProductsResult(IList<Product> similarProducts)
        {
            return new GetSimilarProductsResult()
            {
                Products = similarProducts.Select(p => MapToGetSimilarProductsResultProduct(p)).ToList(),
            };
        }

        public static GetSimilarProductsResultProduct MapToGetSimilarProductsResultProduct(Product similarProduct)
        {
            return new GetSimilarProductsResultProduct()
            {
                Id = similarProduct.Id,
                Name = similarProduct.Name,
                Amount = similarProduct.Price.Amount,
                Currency = similarProduct.Price.Currency,
                Photo = similarProduct.Photos.FirstOrDefault(),
                PromotionAmount = similarProduct?.Promotion?.PromotionalPrice.Amount,
                PromotionCurrency = similarProduct?.Promotion?.PromotionalPrice.Currency,
            };
        }
    }
}