using electro.api.rest.Models.Product;

namespace electro.api.rest.Models.ProductHierarchy
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? GroupId { get; set; }
        public GroupModel? Group { get; set; }
        public IList<SubCategoryModel> SubCategories { get; set; } = new List<SubCategoryModel>();
        public IList<ProductModel> Products { get; set; } = new List<ProductModel>();
    }
}
