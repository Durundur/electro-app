using MediatR;
using Rest.Application.Features.Shared.Pagination;

namespace Rest.Application.Features.Order.GetUserOrders
{
    public class GetUserOrdersQuery : PaginationQuery, IRequest<GetUserOrdersResult>
    {
        public Guid UserId { get; set; }
    }
}
