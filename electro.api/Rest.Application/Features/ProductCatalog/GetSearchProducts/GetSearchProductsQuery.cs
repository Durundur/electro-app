using MediatR;
using Rest.Application.Features.Shared.Pagination;

namespace Rest.Application.Features.ProductCatalog.GetSearchProducts
{
    public class GetSearchProductsQuery : PaginationQuery, IRequest<GetSearchProductsResult>
    {
        public int? GroupId { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public Dictionary<string, string[]> Filters { get; set; } = new Dictionary<string, string[]>();
    }
}
