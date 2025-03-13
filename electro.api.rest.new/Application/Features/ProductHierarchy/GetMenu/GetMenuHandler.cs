using Domain.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.GetMenu
{
    public class GetMenuHandler : IRequestHandler<GetMenuQuery, GetMenuResult>
    {
        private readonly IProductHierarchyRepository _productHierarchyRepository;

        public GetMenuHandler(IProductHierarchyRepository productHierarchyRepository)
        {
            _productHierarchyRepository = productHierarchyRepository;
        }

        public async Task<GetMenuResult> Handle(GetMenuQuery request, CancellationToken cancellationToken)
        {
            var groups = await _productHierarchyRepository.GetMenuAsync(cancellationToken);

            var result = GetMenuMapper.MapToGetMenuResult(groups);
            return result;
        }
    }
}
