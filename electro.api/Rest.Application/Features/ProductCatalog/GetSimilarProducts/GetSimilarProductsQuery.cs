using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetSimilarProducts
{
    public class GetSimilarProductsQuery : IRequest<GetSimilarProductsResult>
    {
        public Guid ProductId { get; set; }
        public int Limit { get; set; } = 8;
    }
}