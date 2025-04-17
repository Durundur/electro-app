using Domain.Aggregates.ProductHierarchyAggregate;

namespace Rest.Application.Features.ProductCatalog.GetSearchFilters
{
    public class GetSearchFiltersResult
    {
        public List<GetSearchFiltersResultElement> Filters { get; set; }
    }

    public class GetSearchFiltersResultElement
    {
        public Guid AttributeDefinitionId { get; set; }
        public AttributeType Type { get; set; }
        public string Name { get; set; }
        public List<string> Values { get; set; } = new List<string>();
    }
}
