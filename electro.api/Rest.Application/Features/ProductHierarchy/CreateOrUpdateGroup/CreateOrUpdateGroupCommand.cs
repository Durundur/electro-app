using MediatR;
using Rest.Application.Features.Shared.AttributeDefinition;

namespace Rest.Application.Features.ProductHierarchy.CreateOrUpdateGroup
{
    public class CreateOrUpdateGroupCommand : IRequest<CreateOrUpdateGroupResult>
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Photo { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public int DisplayOrder { get; set; }
        public IList<AttributeDefinitionCommand> Attributes { get; set; }
    }
}
