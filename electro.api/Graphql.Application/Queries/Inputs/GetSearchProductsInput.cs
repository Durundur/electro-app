namespace Graphql.Application.Queries.Inputs
{
    public class GetSearchProductsInput
    {
        public int? GroupId { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public Dictionary<string, string[]> Filters { get; set; } = new();
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
