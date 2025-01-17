using MediatR;

namespace Application.Features.Order.GetOrderDetails
{
    public class GetOrderDetailsQuery: IRequest<GetOrderDetailsResult>
    {
        public Guid Id { get; set; }
    }
}
