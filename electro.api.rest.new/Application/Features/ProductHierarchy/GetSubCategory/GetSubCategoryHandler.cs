using Application.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.GetSubCategory
{
    public class GetSubCategoryHandler : IRequestHandler<GetSubCategoryQuery, GetSubCategoryResult>
    {
        private readonly IProductHierarchyRepository _productHierarchyRepository;

        public GetSubCategoryHandler(IProductHierarchyRepository productHierarchyRepository)
        {
            _productHierarchyRepository = productHierarchyRepository;
        }

        public async Task<GetSubCategoryResult> Handle(GetSubCategoryQuery request, CancellationToken cancellationToken)
        {
            var subCategory = await _productHierarchyRepository.GetSubCategoryByIdAsync(request.Id);

            var result = GetSubCategoryMapper.MapToGetSubCategoryResult(subCategory);
            return result;
        }
    }
}
