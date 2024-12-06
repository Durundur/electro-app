using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Features.Shared.AttributeDefinition
{
    public class AttributeDefinitionResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public AttributeType Type { get; set; }
        public bool IsRequired { get; set; }
        public string Description { get; set; }
    }
}
