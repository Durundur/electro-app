using Application.Services.Models;

namespace Rest.Application.Features.ProductCatalog.GetSearchFilters
{
    public class GetSearchFiltersResult
    {
        public List<SearchFilterModel> Filters { get; set; }
    }
}
