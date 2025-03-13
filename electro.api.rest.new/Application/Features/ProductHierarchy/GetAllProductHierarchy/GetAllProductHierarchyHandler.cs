using Domain.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.GetProductHierarchy
{
    public class GetAllProductHierarchyHandler : IRequestHandler<GetAllProductHierarchyQuery, GetAllProductHierarchyResult>
    {
        private readonly IProductHierarchyRepository _productHierarchyRepository;

        public GetAllProductHierarchyHandler(IProductHierarchyRepository productHierarchyRepository)
        {
            _productHierarchyRepository = productHierarchyRepository;
        }

        public async Task<GetAllProductHierarchyResult> Handle(GetAllProductHierarchyQuery request, CancellationToken cancellationToken)
        {
            var groups = await _productHierarchyRepository.GetAllProductHierarchiesAsync(cancellationToken);

            var result = GetAllProductHierarchyMapper.MapToGetAllProductHierarchyResult(groups);
            return result;
        }
    }
}
