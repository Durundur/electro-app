using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetAllProductHierarchy
{
    public class GetAllProductHierarchyHandler : IRequestHandler<GetAllProductHierarchyQuery, GetAllProductHierarchyResult>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public GetAllProductHierarchyHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<GetAllProductHierarchyResult> Handle(GetAllProductHierarchyQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var groups = await _productHierarchyService.GetProductHierarchyAsync(cancellationToken);

                var result = GetAllProductHierarchyMapper.MapToGetAllProductHierarchyResult(groups);
                return result;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get product hierarchy", ex);
            }
        }
    }
}
