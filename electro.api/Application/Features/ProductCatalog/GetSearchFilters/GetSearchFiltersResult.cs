using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Features.ProductCatalog.GetSearchFilters
{
    public class GetSearchFiltersResult
    {
        public IList<GetSearchFiltersResultElement> Filters { get; set; }
    }

    public class GetSearchFiltersResultElement
    {
        public Guid AttributeDefinitionId { get; set; }
        public AttributeType Type { get; set; }
        public string Name { get; set; }
        public List<string> Values { get; set; } = new List<string>();
    }
}
