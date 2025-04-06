using MediatR;

namespace Application.Features.ProductCatalog.GetFeaturedProducts
{
    public class GetFeaturedProductsQuery : IRequest<GetFeaturedProductsResult>
    {
        public int Limit { get; set; }
    }
}