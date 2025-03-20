namespace Application.Features.ProductCatalog.GetBestsellerProducts
{
    public static class GetBestsellerProductsMapper
    {
        public static GetBestsellerProductsResult MapToGetBestsellerProductsResult(IList<Domain.Aggregates.ProductCatalogAggregate.Product> products)
        {
            return new GetBestsellerProductsResult()
            {
                Products = products.Select(p => MapToGetBestsellerProductsResultProduct(p)).ToList(),
            };
        }

        public static GetBestsellerProductsResultProduct MapToGetBestsellerProductsResultProduct(Domain.Aggregates.ProductCatalogAggregate.Product product)
        {
            return new GetBestsellerProductsResultProduct()
            {
                Id = product.Id,
                Name = product.Name,
                Amount = product.Price.Amount,
                Currency = product.Price.Currency,
                Photo = product.Photos.FirstOrDefault(),
            };
        }
    }
}