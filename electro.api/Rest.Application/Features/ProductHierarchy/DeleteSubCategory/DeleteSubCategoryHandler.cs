using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.DeleteSubCategory
{
    public class DeleteSubCategoryHandler : IRequestHandler<DeleteSubCategoryCommand, bool>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public DeleteSubCategoryHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<bool> Handle(DeleteSubCategoryCommand request, CancellationToken cancellationToken)
        {
            try
            {
                return await _productHierarchyService.DeleteSubCategoryAsync(request.Id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to delete subcategory", ex);
            }
        }
    }
}
