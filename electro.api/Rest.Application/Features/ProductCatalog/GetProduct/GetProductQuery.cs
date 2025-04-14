using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetProduct
{
    public class GetProductQuery : IRequest<GetProductResult>
    {
        public Guid Id { get; set; }
    }
}
