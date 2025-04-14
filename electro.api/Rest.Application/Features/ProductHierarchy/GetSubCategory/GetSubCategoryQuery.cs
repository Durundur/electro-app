using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetSubCategory
{
    public class GetSubCategoryQuery : IRequest<GetSubCategoryResult>
    {
        public int Id { get; set; }
    }
}
