namespace Rest.Application.Features.Shared.AttributeDefinition
{
    public class AttributeDefinitionMapper
    {
        public static AttributeDefinitionCommand MapToAttributeDefinitionCommand(Domain.Aggregates.ProductHierarchyAggregate.AttributeDefinition attribute)
        {
            return new AttributeDefinitionCommand()
            {
                Id = attribute.Id,
                Name = attribute.Name,
                Description = attribute.Description,
                IsRequired = attribute.IsRequired,
                Type = attribute.Type,
                IsFilterable = attribute.IsFilterable,
            };
        }

        public static AttributeDefinitionResult MapToAttributeDefinitionResult(Domain.Aggregates.ProductHierarchyAggregate.AttributeDefinition attribute)
        {
            return new AttributeDefinitionResult()
            {
                Id = attribute.Id,
                Name = attribute.Name,
                Description = attribute.Description,
                IsRequired = attribute.IsRequired,
                Type = attribute.Type,
                IsFilterable = attribute.IsFilterable
            };
        }
    }
}
