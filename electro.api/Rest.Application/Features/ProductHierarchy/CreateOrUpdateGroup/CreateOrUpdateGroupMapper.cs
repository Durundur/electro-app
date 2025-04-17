using Rest.Application.Features.Shared.AttributeDefinition;

namespace Rest.Application.Features.ProductHierarchy.CreateOrUpdateGroup
{
    public static class CreateOrUpdateGroupMapper
    {
        public static CreateOrUpdateGroupResult MapToCreateOrUpdateGroupResult(Domain.Aggregates.ProductHierarchyAggregate.Group group)
        {
            return new CreateOrUpdateGroupResult
            {
                Id = group.Id,
                Name = group.Name,
                Icon = group.Icon,
                Photo = group.Photo,
                Active = group.Active,
                Description = group.Description,
                DisplayOrder = group.DisplayOrder,
                CreatedAt = group.CreatedAt,
                ModifiedAt = group.ModifiedAt,
                Attributes = group.Attributes.Select(a => AttributeDefinitionMapper.MapToAttributeDefinitionResult(a)).ToList(),
            };
        }
    }
}
