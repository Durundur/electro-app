using electro.api.rest.Models.Product;

namespace electro.api.rest.Models.ProductHierarchy
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
}
