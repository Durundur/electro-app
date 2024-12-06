using Application.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.GetGroup
{
    public class GetGroupHandler : IRequestHandler<GetGroupQuery, GetGroupResult>
    {
        private readonly IProductHierarchyRepository _productHierarchyRepository;

        public GetGroupHandler(IProductHierarchyRepository productHierarchyRepository)
        {
            _productHierarchyRepository = productHierarchyRepository;
        }

        public async Task<GetGroupResult> Handle(GetGroupQuery request, CancellationToken cancellationToken)
        {
            var group = await _productHierarchyRepository.GetGroupByIdAsync(request.Id);

            var result = GetGroupMapper.MapToGetGroupResult(group);
            return result;
        }
    }
}
