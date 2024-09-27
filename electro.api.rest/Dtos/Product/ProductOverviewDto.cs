using electro.api.rest.DTOs.ProductHierarchy;
using electro.api.rest.Models.Price;
using electro.api.rest.Models.Product;

namespace electro.api.rest.DTOs.Product
{
    public class ProductOverviewDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ProductPrice Price { get; set; }
        public ProductHierarchyDto Group { get; set; }
        public ProductHierarchyDto Category { get; set; }
        public ProductHierarchyDto SubCategory { get; set; }
        public bool isArchived { get; set; }
        public bool isPublished { get; set; }
        public int OpinionsCount { get; set; }
        public float AverageOpinionsRating { get; set; }
        public string Photo { get; set; }
        public IEnumerable<ProductSpecificationField> Features { get; set; }
        public int StockQuantity { get; set; }
    }
}
