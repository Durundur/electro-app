using Domain.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.GetGroup
{
    public class GetGroupHandler : IRequestHandler<GetGroupQuery, GetGroupResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetGroupHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetGroupResult> Handle(GetGroupQuery request, CancellationToken cancellationToken)
        {
            var group = await _unitOfWork.ProductHierarchyRepository.GetGroupByIdAsync(request.Id, cancellationToken);

            var result = GetGroupMapper.MapToGetGroupResult(group);
            return result;
        }
    }
}
