namespace electro.api.rest.DTOs.ProductHierarchy
{
    public class GroupDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Photo { get; set; }
        public IEnumerable<CategoryDto>? Categories { get; set; }
    }
}
