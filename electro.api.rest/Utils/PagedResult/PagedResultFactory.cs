using electro.api.rest.QueryFilters;
using Microsoft.EntityFrameworkCore;


namespace electro.api.rest.Utils.PagedResult
{
    public static class PagedResultFactory
    {
        public static async Task<PagedResult<TResult>> CreatePagedResultAsync<TResult, TSource>(
            IQueryable<TSource> source,
            PaginationParams paginationParams,
            Func<IEnumerable<TSource>, IEnumerable<TResult>> mapFunction = null)
        {
            var totalItems = await source.CountAsync();

            var items = await source
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
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
                paginationParams.PageNumber,
                paginationParams.PageSize,
                totalItems
            );
        }

        public static async Task<PagedResult<TSource>> CreatePagedResultAsync<TSource>(
            IQueryable<TSource> source,
            PaginationParams paginationParams)
        {
            return await CreatePagedResultAsync<TSource, TSource>(source, paginationParams);
        }

        public static PagedResult<T> CreatePagedResult<T>(IQueryable<T> source, PaginationParams paginationParams)
        {
            var totalItems = source.Count();
            var items = source
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToList();

            return new PagedResult<T>(
                items,
                paginationParams.PageNumber,
                paginationParams.PageSize,
                totalItems
            );
        }
    }
}
