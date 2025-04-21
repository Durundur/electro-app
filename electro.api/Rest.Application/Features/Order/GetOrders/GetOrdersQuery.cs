using MediatR;
using Application.Shared.Pagination;

namespace Rest.Application.Features.Order.GetOrders
{
    public class GetOrdersQuery : PaginationQuery, IRequest<GetOrdersResult>
    {
    }
}
