using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Models
{
    public class ProductModel : BaseModel
    {
        public string Name { get; set; }
        public GroupModel Group { get; set; }
        public CategoryModel Category { get; set; }
        public SubCategoryModel SubCategory { get; set; }
        public string PhotosUrls { get; set; }
        public string Description { get; set; }
        public AvailabilityState Availability { get; set; }
        public int StockQuantity { get; set; }
        public ProductPrice Price { get; set; }
        public ProductSpecificationModel Specification {  get; set; }
        public IEnumerable<OpinionModel> Opinions { get; set; } = new List<OpinionModel>();
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
        public string Currency {  get; set; }
        public decimal Price { get; set;}
        public decimal? NewPrice { get; set; }
    }

    
}
