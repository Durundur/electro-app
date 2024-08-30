
namespace electro.api.rest.Utils.PagedResult
{
    public class PagedResult<T>: PaginationInfo
    {
        public IEnumerable<T> Data { get; set; }
        public PagedResult(IEnumerable<T> items, int pageNumber, int pageSize, int totalItems)
        {
            Data = items;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalItems = totalItems;
            TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        }
    }
}
