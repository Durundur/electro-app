namespace electro.api.rest.Models
{
    public class GroupModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Photo { get; set; }
        public IList<CategoryModel> Categories { get; set; } = new List<CategoryModel>();
        public IList<ProductModel> Products { get; set; } = new List<ProductModel>();

    }

    public class CategoryModel
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public int? GroupId { get; set; }
        public GroupModel? Group { get; set; }
        public IList<SubCategoryModel> SubCategories { get; set; } = new List<SubCategoryModel>();
        public IList<ProductModel> Products { get; set; } = new List<ProductModel>();
    }

    public class SubCategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? CategoryId { get; set; }
        public CategoryModel? Category { get; set; }
        public IList<ProductModel> Products { get; set; } = new List<ProductModel>();
    }
}
