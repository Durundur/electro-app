using Domain.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.GetCategory
{
    public class GetCategoryHandler : IRequestHandler<GetCategoryQuery, GetCategoryResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetCategoryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetCategoryResult> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.ProductHierarchyRepository.GetCategoryByIdAsync(request.Id, cancellationToken);

            var result = GetCategoryMapper.MapToGetCategoryResult(category);
            return result;
        }
    }
}
