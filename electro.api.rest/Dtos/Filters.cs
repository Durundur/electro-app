namespace electro.api.rest.Dtos
{
    public class Filters
    {
        public class PaginationFilter
        {
            public int PageNumber { get; set; }
            public int PageSize { get; set; }
            public PaginationFilter()
            {
                PageNumber = 1;
                PageSize = 5;
            }
            public PaginationFilter(int pageNumber, int pageSize)
            {
                PageNumber = pageNumber < 1 ? 1 : pageNumber;
                PageSize = pageSize;
            }
        }

        public class ProductFilter
        {
            public int? Group { get; set; }
            public int? Category { get; set; }
            public int? Subcategory { get; set; }
        }

    }
}
