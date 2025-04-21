using Application.Shared.Pagination;
using MediatR;

namespace Rest.Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogQuery : PaginationQuery, IRequest<GetProductCatalogResult>
    {
    }
}
