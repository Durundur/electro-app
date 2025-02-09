using Domain.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.DeleteSubCategory
{
    public class DeleteSubCategoryHandler : IRequestHandler<DeleteSubCategoryCommand, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteSubCategoryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DeleteSubCategoryCommand request, CancellationToken cancellationToken)
        {
            var subCategory = await _unitOfWork.ProductHierarchyRepository.GetSubCategoryByIdAsync(request.Id);

            if (subCategory == null)
            {
                throw new Exception($"SubCategory with ID {request.Id} not found");
            }

            _unitOfWork.ProductHierarchyRepository.DeleteSubCategory(subCategory);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
