using Application.Features.Shared.Pagination;
using MediatR;

namespace Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogQuery : PaginationQuery, IRequest<GetProductCatalogResult>
    {
    }
}
