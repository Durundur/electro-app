using Domain.Reposiotories;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetMenu
{
    public class GetMenuHandler : IRequestHandler<GetMenuQuery, GetMenuResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetMenuHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetMenuResult> Handle(GetMenuQuery request, CancellationToken cancellationToken)
        {
            var groups = await _unitOfWork.ProductHierarchyRepository.GetMenuAsync(cancellationToken);

            var result = GetMenuMapper.MapToGetMenuResult(groups);
            return result;
        }
    }
}
