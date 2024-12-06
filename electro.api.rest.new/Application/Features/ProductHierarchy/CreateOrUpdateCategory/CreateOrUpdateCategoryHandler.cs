using Application.Reposiotories;
using Domain.Aggregates.ProductHierarchyAggregate;
using MediatR;

namespace Application.Features.ProductHierarchy.CreateOrUpdateCategory
{
    public class CreateOrUpdateCategoryHandler : IRequestHandler<CreateOrUpdateCategoryCommand, CreateOrUpdateCategoryResult>
    {
        private readonly IProductHierarchyRepository _repository;

        public CreateOrUpdateCategoryHandler(IProductHierarchyRepository repository)
        {
            _repository = repository;
        }

        public async Task<CreateOrUpdateCategoryResult> Handle(CreateOrUpdateCategoryCommand command, CancellationToken cancellationToken)
        {
            Category category;

            if (command.Id.HasValue)
            {
                category = await _repository.GetCategoryByIdAsync(command.Id.Value)
                    ?? throw new Exception($"Category with ID {command.Id} not found");

                category.Update(command.Name, command.Description, command.Active, command.DisplayOrder);
            }
            else
            {
                category = new Category(command.Name, command.Description, command.Active, command.DisplayOrder);
                category.AssignToGroup(command.GroupId);
                _repository.AddCategory(category);
            }

            var attributesToRemove = category.Attributes
                .Where(a => !command.Attributes.Any(ac => ac.Id == a.Id && ac.Id.HasValue))
                .ToList();

            foreach (var attribute in attributesToRemove)
            {
                category.RemoveAttribute(attribute);
            }

            foreach (var receivedAttribute in command.Attributes)
            {
                var existingAttribute = category.Attributes.FirstOrDefault(a => a.Id == receivedAttribute.Id);

                if (existingAttribute != null)
                {
                    existingAttribute.Update(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description);
                }
                else
                {
                    var newAttribute = new AttributeDefinition(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description);
                    category.AddAttribute(newAttribute);
                }
            }

            await _repository.SaveChangesAsync();

            return category.MapToCreateOrUpdateCategoryResult();
        }
    }
}
