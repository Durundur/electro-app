using MediatR;

namespace Application.Features.ProductCatalog.GetBestsellerProducts
{
    public class GetBestsellerProductsQuery : IRequest<GetBestsellerProductsResult>
    {
        public int Limit { get; set; }
    }
}