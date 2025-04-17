using Rest.Application.Features.Shared.AttributeDefinition;

namespace Rest.Application.Features.ProductHierarchy.CreateOrUpdateSubCategory
{
    public static class CreateOrUpdateSubCategoryMapper
    {
        public static CreateOrUpdateSubCategoryResult MapToCreateOrUpdateSubCategoryResult(Domain.Aggregates.ProductHierarchyAggregate.SubCategory subCategory)
        {
            return new CreateOrUpdateSubCategoryResult
            {
                Id = subCategory.Id,
                Name = subCategory.Name,
                Active = subCategory.Active,
                Description = subCategory.Description,
                DisplayOrder = subCategory.DisplayOrder,
                CategoryId = subCategory.CategoryId,
                CreatedAt = subCategory.CreatedAt,
                ModifiedAt = subCategory.ModifiedAt,
                Attributes = subCategory.Attributes.Select(a => AttributeDefinitionMapper.MapToAttributeDefinitionResult(a)).ToList(),
            };
        }
    }
}
