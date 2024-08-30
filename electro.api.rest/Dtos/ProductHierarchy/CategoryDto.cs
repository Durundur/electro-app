namespace electro.api.rest.DTOs.ProductHierarchy
{
    public class CategoryDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int? GroupId { get; set; }
        public IEnumerable<SubCategoryDto>? SubCategories { get; set; }
    }
}
