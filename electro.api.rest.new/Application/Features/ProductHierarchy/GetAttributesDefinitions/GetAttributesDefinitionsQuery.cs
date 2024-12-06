using MediatR;

namespace Application.Features.ProductHierarchy.GetAttributesDefinitions
{
    public class GetAttributesDefinitionsQuery: IRequest<GetAttributesDefinitionsResult>
    {
        public int? GroupId { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set;}
    }
}
