
namespace electro.api.rest.Models
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
        public List<byte[]> Photos { get; set; }
        public string Description { get; set; }
        public ProductSpecificationModel Specification { get; set; }
        public List<ProductSpecificationField> Features { get; set; }
        public AvailabilityState Availability { get; set; }
        public int StockQuantity { get; set; }
        public bool IsArchived { get; set; }
        public bool IsPublished { get; set; }
        public List<OpinionModel> Opinions { get; set; } = new List<OpinionModel>();
    }

    public enum AvailabilityState
    {
        OutOfStock,
        Available,
        Preorder,
        Discontinued
    }

    public class ProductPrice
    {
        public string? Currency {  get; set; }
        public decimal Price { get; set;}
        public decimal? NewPrice { get; set; }
    }

    
}
