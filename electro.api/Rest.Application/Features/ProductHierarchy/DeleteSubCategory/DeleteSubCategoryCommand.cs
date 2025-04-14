using MediatR;

namespace Rest.Application.Features.ProductHierarchy.DeleteSubCategory
{
    public class DeleteSubCategoryCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
