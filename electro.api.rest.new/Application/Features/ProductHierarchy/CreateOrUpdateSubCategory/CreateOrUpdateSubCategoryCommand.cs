using Application.Features.Shared.AttributeDefinition;
using MediatR;

namespace Application.Features.ProductHierarchy.CreateOrUpdateSubCategory
{
    public class CreateOrUpdateSubCategoryCommand: IRequest<CreateOrUpdateSubCategoryResult>
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public int DisplayOrder { get; set; }
        public int CategoryId { get; set; }
        public IList<AttributeDefinitionCommand> Attributes { get; set; }
    }
}
