using Domain.Reposiotories;
using Domain.Aggregates.ProductHierarchyAggregate;
using MediatR;
using Application.Exceptions;

namespace Application.Features.ProductHierarchy.CreateOrUpdateSubCategory
{
    public class CreateOrUpdateSubCategoryHandler : IRequestHandler<CreateOrUpdateSubCategoryCommand, CreateOrUpdateSubCategoryResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateOrUpdateSubCategoryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CreateOrUpdateSubCategoryResult> Handle(CreateOrUpdateSubCategoryCommand command, CancellationToken cancellationToken)
        {
            SubCategory subCategory;

            if (command.Id.HasValue)
            {
                subCategory = await _unitOfWork.ProductHierarchyRepository.GetSubCategoryByIdAsync(command.Id.Value);
                if (subCategory == null)
                {
                    throw new NotFoundException($"Subcategory with ID {command.Id} not found");
                }
                subCategory.Update(command.Name, command.Description, command.Active, command.DisplayOrder);
            }
            else
            {
                subCategory = SubCategory.Create(command.Name, command.Description, command.Active, command.DisplayOrder);
                subCategory.AssignToCategory(command.CategoryId);
                await _unitOfWork.ProductHierarchyRepository.AddSubCategoryAsync(subCategory, cancellationToken);
            }

            var attributesToRemove = subCategory.Attributes
                .Where(a => !command.Attributes.Any(ac => ac.Id == a.Id && ac.Id.HasValue))
                .ToList();

            foreach (var attribute in attributesToRemove)
            {
                subCategory.RemoveAttribute(attribute);
                await _unitOfWork.AttributeDefinitionRepository.DeleteAttributeDefinitionAsync(attribute.Id, cancellationToken);
            }

            foreach (var receivedAttribute in command.Attributes)
            {
                var existingAttribute = subCategory.Attributes.FirstOrDefault(a => a.Id == receivedAttribute.Id);

                if (existingAttribute != null)
                {
                    existingAttribute.Update(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                }
                else
                {
                    var newAttribute = new AttributeDefinition(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                    subCategory.AddAttribute(newAttribute);
                }
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return subCategory.MapToCreateOrUpdateSubCategoryResult();
        }
    }
}
