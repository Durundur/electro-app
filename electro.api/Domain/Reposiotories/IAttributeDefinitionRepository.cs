using Domain.Aggregates.ProductHierarchyAggregate;

namespace Domain.Reposiotories
{
    public interface IAttributeDefinitionRepository
    {
        IQueryable<AttributeDefinition> GetAttributesDefinitionsQuery();
        Task DeleteAttributeDefinitionAsync(Guid attributeId, CancellationToken cancellationToken);
    }
}
