using MediatR;
using Rest.Application.Features.Shared.Pagination;

namespace Rest.Application.Features.ProductCatalog.GetProductCatalog
{
    public class GetProductCatalogQuery : PaginationQuery, IRequest<GetProductCatalogResult>
    {
    }
}
