using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetSubCategory
{
    public class GetSubCategoryHandler : IRequestHandler<GetSubCategoryQuery, GetSubCategoryResult>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public GetSubCategoryHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<GetSubCategoryResult> Handle(GetSubCategoryQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var subCategory = await _productHierarchyService.GetSubCategoryByIdAsync(request.Id, cancellationToken);

                var result = GetSubCategoryMapper.MapToGetSubCategoryResult(subCategory);
                return result;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get subcategory", ex);
            }
        }
    }
}
