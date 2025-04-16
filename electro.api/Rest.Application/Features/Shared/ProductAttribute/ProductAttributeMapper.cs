namespace Rest.Application.Features.Shared.ProductAttribute
{
    public static class ProductAttributeMapper
    {
        public static ProductAttributeResult MapToProductAttributeResult(Domain.Aggregates.ProductCatalogAggregate.AttributeValue attributeValue, Domain.Aggregates.ProductHierarchyAggregate.AttributeDefinition attributeDefinition)
        {
            return new ProductAttributeResult
            {
                Id = attributeDefinition.Id,
                Name = attributeDefinition.Name,
                Type = attributeDefinition.Type,
                Value = attributeValue.Value,
                IsPrimary = attributeValue.IsPrimary,
            };
        }

        public static List<ProductAttributeResult> MapToListOfProductAttributeResult(IEnumerable<Domain.Aggregates.ProductCatalogAggregate.AttributeValue> attributeValues)
        {
            return attributeValues
                .Select(av => MapToProductAttributeResult(av, av.AttributeDefinition))
                .ToList();
        }
    }
}
