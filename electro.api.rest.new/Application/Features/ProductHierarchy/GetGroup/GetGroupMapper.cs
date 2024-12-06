using Domain.Aggregates.ProductHierarchyAggregate;
using Application.Features.Shared.AttributeDefinition;

namespace Application.Features.ProductHierarchy.GetGroup
{
    public static class GetGroupMapper
    {
        public static GetGroupResult MapToGetGroupResult (Group group)
        {
            return new GetGroupResult()
            {
                Id = group.Id,
                Name = group.Name,
                Description = group.Description,
                Photo = group.Photo,
                Icon = group.Icon,
                Active = group.Active,
                DisplayOrder = group.DisplayOrder,
                CreatedAt = group.CreatedAt,
                ModifiedAt = group.ModifiedAt,
                Attributes = group.Attributes.Select(a => AttributeDefinitionMapper.MapToAttributeDefinitionResult(a)).ToList(),
            };
        }
    }
}
