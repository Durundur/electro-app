using Application.Reposiotories;
using Domain.Aggregates.ProductHierarchyAggregate;
using MediatR;

namespace Application.Features.ProductHierarchy.CreateOrUpdateSubCategory
{
    public class CreateOrUpdateSubCategoryHandler : IRequestHandler<CreateOrUpdateSubCategoryCommand, CreateOrUpdateSubCategoryResult>
    {
        private readonly IProductHierarchyRepository _repository;

        public CreateOrUpdateSubCategoryHandler(IProductHierarchyRepository repository)
        {
            _repository = repository;
        }

        public async Task<CreateOrUpdateSubCategoryResult> Handle(CreateOrUpdateSubCategoryCommand command, CancellationToken cancellationToken)
        {
            SubCategory subCategory;

            if (command.Id.HasValue)
            {
                subCategory = await _repository.GetSubCategoryByIdAsync(command.Id.Value)
                    ?? throw new Exception($"Category with ID {command.Id} not found");

                subCategory.Update(command.Name, command.Description, command.Active, command.DisplayOrder);
            }
            else
            {
                subCategory = new SubCategory(command.Name, command.Description, command.Active, command.DisplayOrder);
                subCategory.AssignToCategory(command.CategoryId);
                _repository.AddSubCategory(subCategory);
            }

            var attributesToRemove = subCategory.Attributes
                .Where(a => !command.Attributes.Any(ac => ac.Id == a.Id && ac.Id.HasValue))
                .ToList();

            foreach (var attribute in attributesToRemove)
            {
                subCategory.RemoveAttribute(attribute);
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

            await _repository.SaveChangesAsync();

            return subCategory.MapToCreateOrUpdateSubCategoryResult();
        }
    }
}
