using electro.api.rest.Models.Product;

namespace electro.api.rest.Models.ProductHierarchy
{
    public class SubCategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? CategoryId { get; set; }
        public CategoryModel? Category { get; set; }
        public IList<ProductModel> Products { get; set; } = new List<ProductModel>();
    }
}
