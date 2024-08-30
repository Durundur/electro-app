using electro.api.rest.QueryFilters;
using Microsoft.EntityFrameworkCore;


namespace electro.api.rest.Utils.PagedResult
{
    public static class PagedResultFactory
    {
        public static async Task<PagedResult<TResult>> CreatePagedResultAsync<TResult, TSource>(
            IQueryable<TSource> source,
            PaginationFilter paginationFilter,
            Func<IEnumerable<TSource>, IEnumerable<TResult>> mapFunction = null)
        {
            var totalItems = await source.CountAsync();

            var items = await source
                .Skip((paginationFilter.PageNumber - 1) * paginationFilter.PageSize)
                .Take(paginationFilter.PageSize)
                .ToListAsync();

            IEnumerable<TResult> mappedItems;
            if (mapFunction != null)
            {
                mappedItems = mapFunction(items);
            }
            else
            {
                if (typeof(TSource) == typeof(TResult))
                {
                    mappedItems = (IEnumerable<TResult>)items;
                }
                else
                {
                    throw new InvalidOperationException("No mapping function provided, and source type is not the same as result type.");
                }
            }

            return new PagedResult<TResult>(
                mappedItems,
                paginationFilter.PageNumber,
                paginationFilter.PageSize,
                totalItems
            );
        }

        public static async Task<PagedResult<TSource>> CreatePagedResultAsync<TSource>(
            IQueryable<TSource> source,
            PaginationFilter paginationFilter)
        {
            return await CreatePagedResultAsync<TSource, TSource>(source, paginationFilter);
        }

        public static PagedResult<T> CreatePagedResult<T>(IQueryable<T> source, PaginationFilter paginationFilter)
        {
            var totalItems = source.Count();
            var items = source
                .Skip((paginationFilter.PageNumber - 1) * paginationFilter.PageSize)
                .Take(paginationFilter.PageSize)
                .ToList();

            return new PagedResult<T>(
                items,
                paginationFilter.PageNumber,
                paginationFilter.PageSize,
                totalItems
            );
        }
    }
}
