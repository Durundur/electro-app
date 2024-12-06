using Application.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.DeleteCategory
{
    public class DeleteCategoryHandler : IRequestHandler<DeleteCategoryCommand, bool>
    {
        private readonly IProductHierarchyRepository _repository;

        public DeleteCategoryHandler(IProductHierarchyRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _repository.GetCategoryByIdAsync(request.Id);

            if (category == null)
            {
                throw new Exception($"Category with ID {request.Id} not found");
            }

            _repository.DeleteCategory(category);
            await _repository.SaveChangesAsync();

            return true;
        }
    }
}
