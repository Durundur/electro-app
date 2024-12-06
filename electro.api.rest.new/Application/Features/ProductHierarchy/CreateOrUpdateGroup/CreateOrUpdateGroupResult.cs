using Application.Features.Shared.AttributeDefinition;

namespace Application.Features.ProductHierarchy.CreateOrUpdateGroup
{
    public class CreateOrUpdateGroupResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Photo { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public IList<AttributeDefinitionResult> Attributes { get; set; }
    }
}
