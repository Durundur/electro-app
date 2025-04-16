using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Services.Models
{
    public class SearchFilterModel
    {
        public Guid AttributeDefinitionId { get; set; }
        public AttributeType Type { get; set; }
        public string Name { get; set; }
        public List<string> Values { get; set; } = new List<string>();
    }
}
