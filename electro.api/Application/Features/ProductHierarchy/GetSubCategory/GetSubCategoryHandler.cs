using Domain.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.GetSubCategory
{
    public class GetSubCategoryHandler : IRequestHandler<GetSubCategoryQuery, GetSubCategoryResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetSubCategoryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetSubCategoryResult> Handle(GetSubCategoryQuery request, CancellationToken cancellationToken)
        {
            var subCategory = await _unitOfWork.ProductHierarchyRepository.GetSubCategoryByIdAsync(request.Id, cancellationToken);

            var result = GetSubCategoryMapper.MapToGetSubCategoryResult(subCategory);
            return result;
        }
    }
}
