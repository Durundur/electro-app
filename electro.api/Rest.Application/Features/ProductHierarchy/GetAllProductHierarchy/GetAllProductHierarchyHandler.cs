using Domain.Reposiotories;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetAllProductHierarchy
{
    public class GetAllProductHierarchyHandler : IRequestHandler<GetAllProductHierarchyQuery, GetAllProductHierarchyResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllProductHierarchyHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetAllProductHierarchyResult> Handle(GetAllProductHierarchyQuery request, CancellationToken cancellationToken)
        {
            var groups = await _unitOfWork.ProductHierarchyRepository.GetAllProductHierarchiesAsync(cancellationToken);

            var result = GetAllProductHierarchyMapper.MapToGetAllProductHierarchyResult(groups);
            return result;
        }
    }
}
