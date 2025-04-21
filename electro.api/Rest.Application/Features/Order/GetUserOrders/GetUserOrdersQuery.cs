using MediatR;
using Application.Shared.Pagination;

namespace Rest.Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersQuery : PaginationQuery, IRequest<GetUserOrdersResult>
    {
        public Guid UserId { get; set; }
    }
}
