﻿namespace electro.api.rest.QueryFilters
{
    public class PaginationFilter
    {
        private int _pageNumber;
        private int _pageSize;

        public int PageNumber
        {
            get { return _pageNumber; }
            set { _pageNumber = Math.Clamp(value, 1, 200); }
        }
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = Math.Clamp(value, 1, 100); }
        }

        public PaginationFilter(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public PaginationFilter()
        {
            _pageNumber = 1;
            _pageSize = 10;
        }
    }
}
