using Application.Features.Shared.AttributeDefinition;

namespace Application.Features.ProductHierarchy.CreateOrUpdateCategory
{
    public static class CreateOrUpdateCategoryMapper
    {
        public static CreateOrUpdateCategoryResult MapToCreateOrUpdateCategoryResult(this Domain.Aggregates.ProductHierarchyAggregate.Category category)
        {
            return new CreateOrUpdateCategoryResult
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                Active = category.Active,
                DisplayOrder = category.DisplayOrder,
                GroupId = category.GroupId,
                CreatedAt = category.CreatedAt,
                ModifiedAt = category.ModifiedAt,
                Attributes = category.Attributes.Select(a => AttributeDefinitionMapper.MapToAttributeDefinitionResult(a)).ToList(),
            };
        }
    }
}
