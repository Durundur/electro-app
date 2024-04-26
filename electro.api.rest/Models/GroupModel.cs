namespace electro.api.rest.Models
{
    public class GroupModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IconUrl { get; set; }
        public string PhotoUrl { get; set; }
        public IEnumerable<CategoryModel> Categories { get; set; } = new List<CategoryModel>();
        public IEnumerable<ProductModel> Products { get; set; } = new List<ProductModel>();

    }

    public class CategoryModel
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public int? GroupId { get; set; }
        public GroupModel? Group { get; set; }
        public IEnumerable<SubCategoryModel> SubCategories { get; set; } = new List<SubCategoryModel>();
        public IEnumerable<ProductModel> Products { get; set; } = new List<ProductModel>();
    }

    public class SubCategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? CategoryId { get; set; }
        public CategoryModel? Category { get; set; }
        public IEnumerable<ProductModel> Products { get; set; } = new List<ProductModel>();
    }
}
