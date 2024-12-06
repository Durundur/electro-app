using MediatR;

namespace Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogQuery : IRequest<GetProductCatalogResult>
    {
        public int PageSize { get; set; }
        public int Page { get; set; }
    }
}
