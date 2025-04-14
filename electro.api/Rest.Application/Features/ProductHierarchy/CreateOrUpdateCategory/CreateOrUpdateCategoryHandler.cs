using Domain.Reposiotories;
using Domain.Aggregates.ProductHierarchyAggregate;
using MediatR;

namespace Rest.Application.Features.ProductHierarchy.CreateOrUpdateCategory
{
    public class CreateOrUpdateCategoryHandler : IRequestHandler<CreateOrUpdateCategoryCommand, CreateOrUpdateCategoryResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateOrUpdateCategoryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CreateOrUpdateCategoryResult> Handle(CreateOrUpdateCategoryCommand command, CancellationToken cancellationToken)
        {
            Category category;

            if (command.Id.HasValue)
            {
                category = await _unitOfWork.ProductHierarchyRepository.GetCategoryByIdAsync(command.Id.Value);

                if (category == null)
                {
                    throw new Exception($"Category with ID {command.Id} not found");
                }

                category.Update(command.Name, command.Description, command.Active, command.DisplayOrder);
            }
            else
            {
                category = new Category(command.Name, command.Description, command.Active, command.DisplayOrder);
                category.AssignToGroup(command.GroupId);
                await _unitOfWork.ProductHierarchyRepository.AddCategoryAsync(category, cancellationToken);
            }

            var attributesToRemove = category.Attributes
                .Where(a => !command.Attributes.Any(ac => ac.Id == a.Id && ac.Id.HasValue))
                .ToList();

            foreach (var attribute in attributesToRemove)
            {
                category.RemoveAttribute(attribute);
                await _unitOfWork.AttributeDefinitionRepository.DeleteAttributeDefinitionAsync(attribute.Id, cancellationToken);
            }

            foreach (var receivedAttribute in command.Attributes)
            {
                var existingAttribute = category.Attributes.FirstOrDefault(a => a.Id == receivedAttribute.Id);

                if (existingAttribute != null)
                {
                    existingAttribute.Update(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                }
                else
                {
                    var newAttribute = new AttributeDefinition(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                    category.AddAttribute(newAttribute);
                }
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return category.MapToCreateOrUpdateCategoryResult();
        }
    }
}
