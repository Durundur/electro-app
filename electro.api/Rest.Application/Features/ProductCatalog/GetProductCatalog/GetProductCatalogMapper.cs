namespace Rest.Application.Features.ProductCatalog.GetProductCatalog
{
    public static class GetProductCatalogMapper
    {
        public static IEnumerable<GetProductCatalogResultProduct> MapToGetProductCatalogResultProducts(IList<Domain.Aggregates.ProductCatalogAggregate.Product> products)
        {
            return products.Select(p => MapToGetProductCatalogResultProduct(p));
        }

        public static GetProductCatalogResultProduct MapToGetProductCatalogResultProduct(Domain.Aggregates.ProductCatalogAggregate.Product product)
        {
            return new GetProductCatalogResultProduct()
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Photo = product.Photos.FirstOrDefault(),
                Status = product.Status,
                StockQuantity = product.StockQuantity,
            };
        }
    }
}
