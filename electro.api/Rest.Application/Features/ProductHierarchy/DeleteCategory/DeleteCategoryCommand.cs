using MediatR;

namespace Rest.Application.Features.ProductHierarchy.DeleteCategory
{
    public class DeleteCategoryCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
