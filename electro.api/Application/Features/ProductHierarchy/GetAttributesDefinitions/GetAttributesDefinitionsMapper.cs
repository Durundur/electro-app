using Application.Features.Shared.AttributeDefinition;

namespace Application.Features.ProductHierarchy.GetAttributesDefinitions
{
    public static class GetAttributesDefinitionsMapper
    {
        public static GetAttributesDefinitionsResult MapToGetAttributesDefinitionsResult(IList<Domain.Aggregates.ProductHierarchyAggregate.AttributeDefinition> attributeDefinition)
        {
            return new GetAttributesDefinitionsResult()
            {
                AttributesDefinitions = attributeDefinition.Select(ad => AttributeDefinitionMapper.MapToAttributeDefinitionResult(ad)).ToList()
            };
        }
    }
}
