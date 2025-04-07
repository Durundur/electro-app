using MediatR;

namespace Application.Features.ProductCatalog.GetSearchFilters
{
    public class GetSearchFiltersQuery : IRequest<GetSearchFiltersResult>
    {
        public int? GroupId { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
    }
}
