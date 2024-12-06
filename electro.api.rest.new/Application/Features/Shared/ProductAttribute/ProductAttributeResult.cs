using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Features.Shared.ProductAttribute
{
    public class ProductAttributeResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public AttributeType Type { get; set; }
        public string Value { get; set; }
        public bool IsPrimary { get; set; }
    }
}
