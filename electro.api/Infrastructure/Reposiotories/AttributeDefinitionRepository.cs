using Infrastructure.Context;
using Domain.Reposiotories;
using Microsoft.EntityFrameworkCore;
using Domain.Aggregates.ProductHierarchyAggregate;

namespace Infrastructure.Reposiotories
{
    public class AttributeDefinitionRepository : IAttributeDefinitionRepository
    {
        private readonly ApplicationDbContext _context;

        public AttributeDefinitionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task DeleteAttributeDefinitionAsync(Guid attributeId, CancellationToken cancellationToken)
        {
            var attribute = await _context.AttributesDefinitions.FirstOrDefaultAsync(ad => ad.Id == attributeId, cancellationToken);
            if (attribute != null)
            {
                _context.AttributesDefinitions.Remove(attribute);
            }
        }

        public IQueryable<AttributeDefinition> GetAttributesDefinitionsQuery()
        {
            return _context.AttributesDefinitions.AsQueryable();
        }
    }
}
