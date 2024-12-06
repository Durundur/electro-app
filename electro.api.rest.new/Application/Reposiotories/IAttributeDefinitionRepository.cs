using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Reposiotories
{
    public interface IAttributeDefinitionRepository
    {
        IQueryable<AttributeDefinition> GetAttributesDefinitionsQuery();
    }
}
