using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetMenu
{
    public class GetMenuHandler : IRequestHandler<GetMenuQuery, GetMenuResult>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public GetMenuHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<GetMenuResult> Handle(GetMenuQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var groups = await _productHierarchyService.GetMenuAsync(cancellationToken);

                var result = GetMenuMapper.MapToGetMenuResult(groups);
                return result;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get menu", ex);
            }
        }
    }
}
