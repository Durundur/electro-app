namespace electro.api.rest.QueryFilters
{
    public class UserOrdersOverviewParams
    {
        public string? Status { get; set; }
        public string? Order { get; set; }
    }

    public enum UserOrdersOverviewSortOption
    {
        DateDesc,
        DateAsc,
        TotalPriceDesc,
        TotalPriceAsc
    }
}
