using MediatR;

namespace Rest.Application.Features.ProductHierarchy.DeleteGroup
{
    public class DeleteGroupCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
