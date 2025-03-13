using Domain.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.GetCategory
{
    public class GetCategoryHandler : IRequestHandler<GetCategoryQuery, GetCategoryResult>
    {
        private readonly IProductHierarchyRepository _productHierarchyRepository;

        public GetCategoryHandler(IProductHierarchyRepository productHierarchyRepository)
        {
            _productHierarchyRepository = productHierarchyRepository;
        }

        public async Task<GetCategoryResult> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
        {
            var category = await _productHierarchyRepository.GetCategoryByIdAsync(request.Id, cancellationToken);

            var result = GetCategoryMapper.MapToGetCategoryResult(category);
            return result;
        }
    }
}
