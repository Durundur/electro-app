using MediatR;

namespace Application.Features.ProductCatalog.GetProduct
{
    public class GetProductQuery: IRequest<GetProductResult>
    {
        public Guid Id { get; set; }

        public GetProductQuery(Guid id)
        { 
            Id = id;
        }
    }
}
