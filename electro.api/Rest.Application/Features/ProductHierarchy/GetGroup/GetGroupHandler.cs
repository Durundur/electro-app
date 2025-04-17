using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetGroup
{
    public class GetGroupHandler : IRequestHandler<GetGroupQuery, GetGroupResult>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public GetGroupHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<GetGroupResult> Handle(GetGroupQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var group = await _productHierarchyService.GetGroupByIdAsync(request.Id, cancellationToken);

                var result = GetGroupMapper.MapToGetGroupResult(group);
                return result;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get category", ex);
            }
        }
    }
}
