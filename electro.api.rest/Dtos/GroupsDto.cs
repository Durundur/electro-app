namespace electro.api.rest.Dtos
{
    public class GroupDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Photo { get; set; }
        public IEnumerable<CategoryDto>? Categories { get; set; }
    }

    public class CategoryDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int? GroupId { get; set; }
        public IEnumerable<SubCategoryDto>? SubCategories { get; set; }
    }

    public class SubCategoryDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int? CategoryId { get; set; }
    }

    public class GroupSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
