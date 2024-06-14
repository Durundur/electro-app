using System.Linq;
using static electro.api.rest.Dtos.Filters;

namespace electro.api.rest.Dtos
{
    public class PagedDto<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
        public IEnumerable<T> Data { get; set; }

        public PagedDto(IEnumerable<T> data, int pageNumber, int pageSize, int totalItems)
        {
            Data = data;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalItems = totalItems;
            TotalPages = (int)Math.Ceiling(TotalItems / (double)pageSize);
        }

        public static PagedDto<T> ToPagedDto(IQueryable<T> source, PaginationFilter paginationFiler)
        {
            var items = source.Skip((paginationFiler.PageNumber - 1) * paginationFiler.PageSize).Take(paginationFiler.PageSize).ToList();
            return new PagedDto<T>(items, paginationFiler.PageNumber, paginationFiler.PageSize, source.Count());
        }
    }
}
