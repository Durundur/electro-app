using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetCategory
{
    public class GetCategoryHandler : IRequestHandler<GetCategoryQuery, GetCategoryResult>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public GetCategoryHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<GetCategoryResult> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var category = await _productHierarchyService.GetCategoryByIdAsync(request.Id, cancellationToken);

                var result = GetCategoryMapper.MapToGetCategoryResult(category);
                return result;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get category", ex);
            }
        }
    }
}
