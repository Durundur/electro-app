using Application.Features.Shared.Pagination;
using MediatR;

namespace Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersQuery: PaginationQuery, IRequest<GetUserOrdersResult>
    {
        public Guid UserId { get; set; }
    }
}
