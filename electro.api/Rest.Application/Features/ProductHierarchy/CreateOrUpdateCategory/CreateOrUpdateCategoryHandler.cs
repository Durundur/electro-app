using MediatR;
using Application.Exceptions;
using Application.Services.Models;
using Application.Services.ProductHierarchyService;

namespace Rest.Application.Features.ProductHierarchy.CreateOrUpdateCategory
{
    public class CreateOrUpdateCategoryHandler : IRequestHandler<CreateOrUpdateCategoryCommand, CreateOrUpdateCategoryResult>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public CreateOrUpdateCategoryHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<CreateOrUpdateCategoryResult> Handle(CreateOrUpdateCategoryCommand command, CancellationToken cancellationToken)
        {
            try
            {
                var model = new CategoryModel
                {
                    Id = command.Id,
                    Name = command.Name,
                    Description = command.Description,
                    DisplayOrder = command.DisplayOrder,
                    Active = command.Active,
                    GroupId = command.GroupId,
                    Attributes = command.Attributes.Select(a => new AttributeDefinitionModel
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        IsFilterable = a.IsFilterable,
                        IsRequired = a.IsRequired,
                        Type = a.Type,
                    }).ToList(),
                };

                var category = await _productHierarchyService.CreateOrUpdateCategoryAsync(model, cancellationToken);

                return CreateOrUpdateCategoryMapper.MapToCreateOrUpdateCategoryResult(category);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update category", ex);
            }
        }
    }
}
