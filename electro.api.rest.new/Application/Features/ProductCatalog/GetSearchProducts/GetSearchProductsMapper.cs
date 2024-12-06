using Application.Features.Shared.ProductAttribute;
using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Features.ProductCatalog.GetSearchProducts
{
    public static class GetSearchProductsMapper
    {
        public static GetSearchProductsResult MapToGetSearchProductsResult(IList<Domain.Aggregates.ProductCatalogAggregate.Product> products, IEnumerable<Domain.Aggregates.ProductHierarchyAggregate.AttributeDefinition> attributeDefinitions)
        {
            return new GetSearchProductsResult()
            {
                Products = products.Select(p => MapToGetSearchProductsResultProduct(p, attributeDefinitions)).ToList(),
            };
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
                AverageOpinionRating = 3.5M,
                OpinionCount = product.Opinions.Count(),
                Attributes = ProductAttributeMapper.MapToListOfProductAttributeResult(product.Attributes, attributeDefinitions)
            };
        }
    }
}
