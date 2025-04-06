using MediatR;

namespace Application.Features.ProductHierarchy.DeleteGroup
{
    public class DeleteGroupCommand: IRequest<bool>
    {
        public int Id { get; set; }
    }
}
