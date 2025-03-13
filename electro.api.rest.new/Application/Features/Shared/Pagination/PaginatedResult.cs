namespace Application.Features.Shared.Pagination
{
    public class PaginatedResult<T>
    {
        public IReadOnlyList<T> Items { get; }
        public int Page { get; }
        public int PageSize { get; }
        public int TotalPages { get; }

        public PaginatedResult(IReadOnlyList<T> items, int count, int page, int pageSize)
        {
            Items = items;
            Page = page;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        }
    }
}