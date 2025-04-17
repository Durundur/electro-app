using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetAttributesDefinitions
{
    public class GetAttributesDefinitionsHandler : IRequestHandler<GetAttributesDefinitionsQuery, GetAttributesDefinitionsResult>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public GetAttributesDefinitionsHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }
        public async Task<GetAttributesDefinitionsResult> Handle(GetAttributesDefinitionsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var attributesDefinitions = await _productHierarchyService.GetAttributesDefinitionsAsync(request.GroupId, request.CategoryId, request.SubCategoryId, cancellationToken);

                var result = GetAttributesDefinitionsMapper.MapToGetAttributesDefinitionsResult(attributesDefinitions);

                return result;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get attributes definitions", ex);
            }
        }
    }
}
