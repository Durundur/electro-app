using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Rest.Application.Features.ProductHierarchy.GetAttributesDefinitions
{
    public class GetAttributesDefinitionsHandler : IRequestHandler<GetAttributesDefinitionsQuery, GetAttributesDefinitionsResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAttributesDefinitionsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<GetAttributesDefinitionsResult> Handle(GetAttributesDefinitionsQuery request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.AttributeDefinitionRepository.GetAttributesDefinitionsQuery();

            query = query.Where(ad =>
                request.GroupId.HasValue && EF.Property<int>(ad, "GroupId") == request.GroupId.Value ||
                request.CategoryId.HasValue && EF.Property<int>(ad, "CategoryId") == request.CategoryId.Value ||
                request.SubCategoryId.HasValue && EF.Property<int>(ad, "SubCategoryId") == request.SubCategoryId.Value
            );

            var attributesDefinitions = await query.ToListAsync(cancellationToken);

            var result = GetAttributesDefinitionsMapper.MapToGetAttributesDefinitionsResult(attributesDefinitions);

            return result;
        }
    }
}
