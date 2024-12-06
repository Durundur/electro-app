namespace Application.Features.ProductCatalog.GetProductCatalog
{
    public static class GetProductCatalogMapper
    {
        public static GetProductCatalogResult MapToGetProductCatalogResult(IList<Domain.Aggregates.ProductCatalogAggregate.Product> products)
        {
            return new GetProductCatalogResult()
            {
                Products = products.Select(p => MapToGetProductCatalogResultProduct(p)).ToList(),
            };
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
