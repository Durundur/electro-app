using MediatR;

namespace Application.Features.ProductHierarchy.GetGroup
{
    public class GetGroupQuery: IRequest<GetGroupResult>
    {
        public int Id { get; set; }
    }
}
