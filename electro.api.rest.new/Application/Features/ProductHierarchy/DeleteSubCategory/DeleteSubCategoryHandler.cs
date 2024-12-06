using Application.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.DeleteSubCategory
{
    public class DeleteSubCategoryHandler : IRequestHandler<DeleteSubCategoryCommand, bool>
    {
        private readonly IProductHierarchyRepository _repository;

        public DeleteSubCategoryHandler(IProductHierarchyRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteSubCategoryCommand request, CancellationToken cancellationToken)
        {
            var subCategory = await _repository.GetSubCategoryByIdAsync(request.Id);

            if (subCategory == null)
            {
                throw new Exception($"SubCategory with ID {request.Id} not found");
            }

            _repository.DeleteSubCategory(subCategory);
            await _repository.SaveChangesAsync();

            return true;
        }
    }
}
