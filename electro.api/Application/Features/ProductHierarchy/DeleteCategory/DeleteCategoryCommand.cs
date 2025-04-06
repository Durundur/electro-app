using MediatR;

namespace Application.Features.ProductHierarchy.DeleteCategory
{
    public class DeleteCategoryCommand: IRequest<bool>
    {
        public int Id { get; set; }
    }
}
