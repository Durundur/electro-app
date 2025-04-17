using Application.Exceptions;
using Application.Services.ProductHierarchyService;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.DeleteGroup
{
    public class DeleteGroupHandler : IRequestHandler<DeleteGroupCommand, bool>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public DeleteGroupHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<bool> Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
        {
            try
            {
                return await _productHierarchyService.DeleteGroupAsync(request.Id, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to delete group", ex);
            }
        }
    }
}
