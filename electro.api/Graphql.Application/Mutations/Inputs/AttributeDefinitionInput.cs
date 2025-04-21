using Domain.Aggregates.ProductHierarchyAggregate;

namespace Graphql.Application.Mutations.Inputs
{
    public class AttributeDefinitionInput
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsFilterable { get; set; }
        public bool IsRequired { get; set; }
        public AttributeType Type { get; set; }
    }
}
