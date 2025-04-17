using MediatR;
using Application.Services.ProductHierarchyService;
using Application.Services.Models;
using Application.Exceptions;

namespace Rest.Application.Features.ProductHierarchy.CreateOrUpdateSubCategory
{
    public class CreateOrUpdateSubCategoryHandler : IRequestHandler<CreateOrUpdateSubCategoryCommand, CreateOrUpdateSubCategoryResult>
    {
        private readonly IProductHierarchyService _productHierarchyService;

        public CreateOrUpdateSubCategoryHandler(IProductHierarchyService productHierarchyService)
        {
            _productHierarchyService = productHierarchyService;
        }

        public async Task<CreateOrUpdateSubCategoryResult> Handle(CreateOrUpdateSubCategoryCommand command, CancellationToken cancellationToken)
        {
            try
            {
                var model = new SubCategoryModel
                {
                    Id = command.Id,
                    Name = command.Name,
                    Description = command.Description,
                    DisplayOrder = command.DisplayOrder,
                    Active = command.Active,
                    CategoryId = command.CategoryId,
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

                var subCategory = await _productHierarchyService.CreateOrUpdateSubCategoryAsync(model, cancellationToken);

                return CreateOrUpdateSubCategoryMapper.MapToCreateOrUpdateSubCategoryResult(subCategory);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to create or update subcategory", ex);
            }
        }
    }
}
