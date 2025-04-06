using Application.Features.Shared.AttributeDefinition;
using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Features.ProductHierarchy.GetCategory
{
    public static class GetCategoryMapper
    {
        public static GetCategoryResult MapToGetCategoryResult(Category category)
        {
            return new GetCategoryResult()
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
