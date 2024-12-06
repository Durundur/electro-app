using Infrastructure.Context;
using Application.Reposiotories;
using Domain.Aggregates.ProductHierarchyAggregate;

namespace Infrastructure.Reposiotories
{
    public class AttributeDefinitionRepository: IAttributeDefinitionRepository
    {
        private readonly ApplicationDbContext _context;

        public AttributeDefinitionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IQueryable<AttributeDefinition> GetAttributesDefinitionsQuery()
        {
            return _context.AttributesDefinitions.AsQueryable();
        }
    }
}
