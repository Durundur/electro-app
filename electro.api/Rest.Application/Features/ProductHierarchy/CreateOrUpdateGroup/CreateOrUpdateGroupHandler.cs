using MediatR;
using Application.Services.ProductHierarchyService;
using Application.Services.Models;
using Application.Exceptions;

namespace Rest.Application.Features.ProductHierarchy.CreateOrUpdateGroup
{
    public class CreateOrUpdateGroupHandler : IRequestHandler<CreateOrUpdateGroupCommand, CreateOrUpdateGroupResult>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public CreateOrUpdateGroupHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<CreateOrUpdateGroupResult> Handle(CreateOrUpdateGroupCommand command, CancellationToken cancellationToken)
        {
            try
            {
                var model = new GroupModel
                {
                    Id = command.Id,
                    Name = command.Name,
                    Icon = command.Icon,
                    Photo = command.Photo,
                    Active = command.Active,
                    Description = command.Description,
                    DisplayOrder = command.DisplayOrder,
                    Attributes = command.Attributes.Select(a => new AttributeDefinitionModel
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        IsFilterable = a.IsFilterable,
                        IsRequired = a.IsRequired,
                        Type = a.Type,
                    }).ToList()
                };

                var group = await _productHierarchyService.CreateOrUpdateGroupAsync(model, cancellationToken);

                return CreateOrUpdateGroupMapper.MapToCreateOrUpdateGroupResult(group);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update group", ex);
            }
        }
    }
}
