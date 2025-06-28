namespace Rest.Application.Features.ProductCatalog.GetFeaturedProducts
{
    public static class GetFeaturedProductsMapper
    {
        public static GetFeaturedProductsResult MapToGetFeaturedProductsResult(IList<Domain.Aggregates.ProductCatalogAggregate.Product> products)
        {
            return new GetFeaturedProductsResult()
            {
                Products = products.Select(p => MapToGetFeaturedProductsResultProduct(p)).ToList(),
            };
        }

        public static GetFeaturedProductsResultProduct MapToGetFeaturedProductsResultProduct(Domain.Aggregates.ProductCatalogAggregate.Product product)
        {
            return new GetFeaturedProductsResultProduct()
            {
                Id = product.Id,
                Name = product.Name,
                Amount = product.Price.Amount,
                Currency = product.Price.Currency,
                Photo = product.Photos.FirstOrDefault(),
                Promotion = product?.Promotion?.IsCurrentlyActive == true ? product.Promotion.PromotionalPrice : null,
            };
        }
    }
}