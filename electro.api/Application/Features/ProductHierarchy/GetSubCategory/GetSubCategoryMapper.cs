using Application.Features.Shared.AttributeDefinition;
using Domain.Aggregates.ProductHierarchyAggregate;

namespace Application.Features.ProductHierarchy.GetSubCategory
{
    public static class GetSubCategoryMapper
    {
        public static GetSubCategoryResult MapToGetSubCategoryResult(SubCategory subCategory)
        {
            return new GetSubCategoryResult()
            {
                Id = subCategory.Id,
                Name = subCategory.Name,
                Description = subCategory.Description,
                Active = subCategory.Active,
                DisplayOrder = subCategory.DisplayOrder,
                CategoryId = subCategory.CategoryId,
                ModifiedAt = subCategory.ModifiedAt,
                CreatedAt = subCategory.CreatedAt,
                Attributes = subCategory.Attributes.Select(a => AttributeDefinitionMapper.MapToAttributeDefinitionResult(a)).ToList()
            };
        }
    }
}
