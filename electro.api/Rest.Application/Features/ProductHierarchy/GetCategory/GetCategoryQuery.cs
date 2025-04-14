using MediatR;

namespace Rest.Application.Features.ProductHierarchy.GetCategory
{
    public class GetCategoryQuery : IRequest<GetCategoryResult>
    {
        public int Id { get; set; }
    }
}
