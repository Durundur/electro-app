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

        public static PagedDto<T> ToPagedDto(IQueryable<T> source, PaginationFilter paginationFilter)
        {
            var totalItems = source.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)paginationFilter.PageSize);
            if (paginationFilter.PageNumber > totalPages)
            {
                paginationFilter.PageNumber = totalPages;
            }
            if(paginationFilter.PageNumber < 1)
            {
                paginationFilter.PageNumber = 1;
            }
            var items = source.Skip((paginationFilter.PageNumber - 1) * paginationFilter.PageSize).Take(paginationFilter.PageSize).ToList();
            return new PagedDto<T>(items, paginationFilter.PageNumber, paginationFilter.PageSize, totalItems);
        }
    }
}
