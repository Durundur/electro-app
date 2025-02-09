using MediatR;

namespace Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersQuery: IRequest<GetUserOrdersResult>
    {
        public Guid UserId { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
