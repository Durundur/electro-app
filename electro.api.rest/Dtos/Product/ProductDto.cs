using electro.api.rest.DTOs.ProductHierarchy;
using electro.api.rest.Models.Price;
using electro.api.rest.Models.Product;

namespace electro.api.rest.Dtos.Product
{
    public class ProductDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public ProductPrice Price { get; set; }
        public ProductHierarchyDto? Group { get; set; }
        public ProductHierarchyDto? Category { get; set; }
        public ProductHierarchyDto? SubCategory { get; set; }
        public IEnumerable<string> Photos { get; set; } = new List<string>();
        public string Description { get; set; }
        public IEnumerable<ProductSpecificationField> Specification { get; set; } = new List<ProductSpecificationField>();
        public IEnumerable<ProductSpecificationField> Features { get; set; } = new List<ProductSpecificationField>();
        public int StockQuantity { get; set; }
        public bool IsArchived { get; set; }
        public bool IsPublished { get; set; }
        public int OpinionsCount { get; set; } = 0;
        public float AverageOpinionsRating { get; set; } = 0;
    }
}
