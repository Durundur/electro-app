using MediatR;

namespace Application.Features.Order.GetUserOrderDetails
{
    public class GetUserOrderDetailsQuery: IRequest<GetUserOrderDetailsResult>
    {
        public Guid UserId { get; set; }
        public Guid OrderId { get; set; }
    }
}
