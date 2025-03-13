using Domain.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.DeleteCategory
{
    public class DeleteCategoryHandler : IRequestHandler<DeleteCategoryCommand, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteCategoryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.ProductHierarchyRepository.GetCategoryByIdAsync(request.Id);

            if (category == null)
            {
                throw new Exception($"Category with ID {request.Id} not found");
            }

            await _unitOfWork.ProductHierarchyRepository.DeleteCategoryAsync(category.Id, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
