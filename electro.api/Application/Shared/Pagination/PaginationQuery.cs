using Application.Exceptions;

namespace Application.Shared.Pagination
{
    public class PaginationQuery
    {
        private const int MaxPageSize = 50;
        private const int MinPageSize = 1;
        private const int MinPage = 1;

        private int _pageSize = 10;
        private int _page = 1;

        public int Page
        {
            get => _page;
            set
            {
                if (value < MinPage)
                    throw new BadRequestException($"Page cannot be less than {MinPage}");
                _page = value;
            }
        }
        public int PageSize
        {
            get => _pageSize;
            set
            {
                if (value < MinPageSize)
                    throw new BadRequestException($"PageSize cannot be less than {MinPageSize}");
                _pageSize = value > MaxPageSize ? MaxPageSize : value;
            }
        }
    }
}
