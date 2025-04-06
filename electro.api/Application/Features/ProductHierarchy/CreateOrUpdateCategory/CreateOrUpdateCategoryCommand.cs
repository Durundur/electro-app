using Application.Features.Shared.AttributeDefinition;
using MediatR;

namespace Application.Features.ProductHierarchy.CreateOrUpdateCategory
{
    public class CreateOrUpdateCategoryCommand: IRequest<CreateOrUpdateCategoryResult>
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
