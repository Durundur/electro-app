using MediatR;
using Rest.Application.Features.Shared.AttributeDefinition;

namespace Rest.Application.Features.ProductHierarchy.CreateOrUpdateCategory
{
    public class CreateOrUpdateCategoryCommand : IRequest<CreateOrUpdateCategoryResult>
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public int DisplayOrder { get; set; }
        public int GroupId { get; set; }
        public IList<AttributeDefinitionCommand> Attributes { get; set; }
    }
}
