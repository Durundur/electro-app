using MediatR;
using Rest.Application.Features.Shared.Pagination;

namespace Rest.Application.Features.Order.GetOrders
{
    public class GetOrdersQuery : PaginationQuery, IRequest<GetOrdersResult>
    {
    }
}
