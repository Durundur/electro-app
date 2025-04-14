using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetBestsellerProducts
{
    public class GetBestsellerProductsQuery : IRequest<GetBestsellerProductsResult>
    {
        public int Limit { get; set; }
    }
}