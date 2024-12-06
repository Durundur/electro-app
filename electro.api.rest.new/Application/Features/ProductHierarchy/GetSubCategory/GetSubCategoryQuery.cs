using MediatR;

namespace Application.Features.ProductHierarchy.GetSubCategory
{
    public class GetSubCategoryQuery: IRequest<GetSubCategoryResult>
    {
        public int Id { get; set; }
    }
}
