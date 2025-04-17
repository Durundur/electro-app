using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Services.Models
{
    public class AttributeDefinitionModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public AttributeType Type { get; set; }
        public bool IsRequired { get; set; }
        public string Description { get; set; }
        public bool IsFilterable { get; set; }
    }
}
