using electro.api.rest.Models.Opinion;
using electro.api.rest.Models.Order.OrderItem;
using electro.api.rest.Models.Price;
using electro.api.rest.Models.ProductHierarchy;

namespace electro.api.rest.Models.Product
{
    public class ProductModel : BaseModel
    {
        public string Name { get; set; }
        public ProductPrice Price { get; set; }
        public int? GroupId { get; set; }
        public GroupModel Group { get; set; }
        public int? CategoryId { get; set; }
        public CategoryModel Category { get; set; }
        public int? SubCategoryId { get; set; }
        public SubCategoryModel SubCategory { get; set; }
        public IList<string> Photos { get; set; } = new List<string>();
        public string Description { get; set; }
        public ProductSpecificationModel Specification { get; set; } = new ProductSpecificationModel();
        public IEnumerable<ProductSpecificationField> Features { get; set; } = new List<ProductSpecificationField>();
        public ProductAvailabilityState Availability { get; set; }
        public int StockQuantity { get; set; }
        public bool IsArchived { get; set; }
        public bool IsPublished { get; set; }
        public IEnumerable<OpinionModel> Opinions { get; set; } = new List<OpinionModel>();
        public int OpinionsCount { get; set; } = 0;
        public float AvgOpinionsRating { get; set; } = 0; 
    }
}
