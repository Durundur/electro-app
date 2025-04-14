using MediatR;

namespace Rest.Application.Features.Order.GetOrderDetails
{
    public class GetOrderDetailsQuery : IRequest<GetOrderDetailsResult>
    {
        public Guid Id { get; set; }
    }
}
