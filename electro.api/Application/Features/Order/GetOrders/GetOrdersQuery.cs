using MediatR;

namespace Application.Features.Order.GetOrders
{
    public class GetOrdersQuery: IRequest<GetOrdersResult>
    {
        public int PageSize { get; set; }
        public int Page {  get; set; }
    }
}
