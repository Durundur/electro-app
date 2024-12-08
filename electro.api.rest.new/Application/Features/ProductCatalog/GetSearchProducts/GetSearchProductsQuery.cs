using MediatR;

namespace Application.Features.ProductCatalog.GetSearchProducts
{
    public class GetSearchProductsQuery : IRequest<GetSearchProductsResult>
    {
        public int? GroupId { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
        public Dictionary<string, string[]> Filters { get; set; } = new Dictionary<string, string[]>();
    }
}
