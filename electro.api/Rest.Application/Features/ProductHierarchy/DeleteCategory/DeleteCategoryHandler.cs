using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.DeleteCategory
{
    public class DeleteCategoryHandler : IRequestHandler<DeleteCategoryCommand, bool>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public DeleteCategoryHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            try
            {
                return await _productHierarchyService.DeleteCategoryAsync(request.Id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to detele category", ex);
            }
        }
    }
}
