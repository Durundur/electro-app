using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetFeaturedProducts
{
    public class GetFeaturedProductsQuery : IRequest<GetFeaturedProductsResult>
    {
        public int Limit { get; set; }
    }
}