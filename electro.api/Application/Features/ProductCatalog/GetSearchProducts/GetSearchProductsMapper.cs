using Application.Features.Shared.ProductAttribute;

namespace Application.Features.ProductCatalog.GetSearchProducts
{
    public static class GetSearchProductsMapper
    {
        public static GetSearchProductsResult MapToGetSearchProductsResult(IList<Domain.Aggregates.ProductCatalogAggregate.Product> products, 
            IEnumerable<Domain.Aggregates.ProductHierarchyAggregate.AttributeDefinition> attributeDefinitions, int totalCount, int page, int pageSize)
        {
            var mappedProducts = products
                .Select(p => MapToGetSearchProductsResultProduct(p, attributeDefinitions))
                .ToList();

            return new GetSearchProductsResult(mappedProducts, totalCount, page, pageSize);
        }

        public static GetSearchProductsResultProduct MapToGetSearchProductsResultProduct(Domain.Aggregates.ProductCatalogAggregate.Product product, IEnumerable<Domain.Aggregates.ProductHierarchyAggregate.AttributeDefinition> attributeDefinitions)
        {
            return new GetSearchProductsResultProduct()
            {
                Id = product.Id,
                Name = product.Name,
                Amount = product.Price.Amount,
                Currency = product.Price.Currency,
                Photo = product.Photos.FirstOrDefault(),
                Status = product.Status,
                AverageOpinionRating = product.Opinions.Any() ? (float)Math.Round(product.Opinions.Average(o => o.Rating), 1) : 0,
                OpinionCount = product.Opinions.Count(),
                Attributes = ProductAttributeMapper.MapToListOfProductAttributeResult(product.Attributes, attributeDefinitions),
                PromotionAmount = product?.Promotion?.PromotionalPrice.Amount,
                PromotionCurrency = product?.Promotion?.PromotionalPrice.Currency,
            };
        }
    }
}
