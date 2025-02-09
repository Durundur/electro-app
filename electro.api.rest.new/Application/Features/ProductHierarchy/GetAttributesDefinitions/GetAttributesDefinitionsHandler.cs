using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductHierarchy.GetAttributesDefinitions
{
    public class GetAttributesDefinitionsHandler : IRequestHandler<GetAttributesDefinitionsQuery, GetAttributesDefinitionsResult>
    {
        private readonly IAttributeDefinitionRepository _attributeDefinitionRepository;

        public GetAttributesDefinitionsHandler(IAttributeDefinitionRepository attributeDefinitionRepository)
        {
            _attributeDefinitionRepository = attributeDefinitionRepository;
        }
        public async Task<GetAttributesDefinitionsResult> Handle(GetAttributesDefinitionsQuery request, CancellationToken cancellationToken)
        {
            var query = _attributeDefinitionRepository.GetAttributesDefinitionsQuery();

            query = query.Where(ad =>
                (request.GroupId.HasValue && EF.Property<int>(ad, "GroupId") == request.GroupId.Value) ||
                (request.CategoryId.HasValue && EF.Property<int>(ad, "CategoryId") == request.CategoryId.Value) ||
                (request.SubCategoryId.HasValue && EF.Property<int>(ad, "SubCategoryId") == request.SubCategoryId.Value)
            );

            var attributesDefinitions = await query.ToListAsync(cancellationToken);

            var result = GetAttributesDefinitionsMapper.MapToGetAttributesDefinitionsResult(attributesDefinitions);

            return result;
        }
    }
}
