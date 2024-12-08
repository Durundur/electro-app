using Application.Reposiotories;
using Domain.Aggregates.ProductHierarchyAggregate;
using MediatR;

namespace Application.Features.ProductHierarchy.CreateOrUpdateGroup
{
    public class CreateOrUpdateGroupHandler : IRequestHandler<CreateOrUpdateGroupCommand, CreateOrUpdateGroupResult>
    {
        private readonly IProductHierarchyRepository _repository;

        public CreateOrUpdateGroupHandler(IProductHierarchyRepository repository)
        {
            _repository = repository;
        }

        public async Task<CreateOrUpdateGroupResult> Handle(CreateOrUpdateGroupCommand command, CancellationToken cancellationToken)
        {
            Group group;

            if (command.Id.HasValue)
            {
                group = await _repository.GetGroupByIdAsync(command.Id.Value)
                    ?? throw new Exception($"Group with ID {command.Id} not found");

                group.Update(command.Name, command.Photo, command.Icon, command.Description, command.Active, command.DisplayOrder);
            }
            else
            {
                group = new Group(command.Name, command.Photo, command.Icon, command.Description, command.Active, command.DisplayOrder);
                _repository.AddGroup(group);
            }

            var attributesToRemove = group.Attributes
                .Where(a => !command.Attributes.Any(ac => ac.Id == a.Id && ac.Id.HasValue))
                .ToList();

            foreach (var attribute in attributesToRemove)
            {
                group.RemoveAttribute(attribute);
            }

            foreach (var receivedAttribute in command.Attributes)
            {
                var existingAttribute = group.Attributes.FirstOrDefault(a => a.Id == receivedAttribute.Id);

                if (existingAttribute != null)
                {
                    existingAttribute.Update(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                }
                else {                
                    var newAttribute = new AttributeDefinition(receivedAttribute.Name, receivedAttribute.Type, receivedAttribute.IsRequired, receivedAttribute.Description, receivedAttribute.IsFilterable);
                    group.AddAttribute(newAttribute);
                }
            }

            await _repository.SaveChangesAsync();

            return group.MapToCreateOrUpdateGroupResult();
        }
    }
}
