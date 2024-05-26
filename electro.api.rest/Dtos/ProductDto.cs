using electro.api.rest.Models;

namespace electro.api.rest.Dtos
{
    public class ProductDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public ProductPrice Price { get; set; }
        public GroupSummaryDto? Group { get; set; }
        public GroupSummaryDto? Category { get; set; }
        public GroupSummaryDto? SubCategory { get; set; }
        public List<string> Photos { get; set; }
        public string Description { get; set; }
        public List<ProductSpecificationField> Specification { get; set; }
        public List<ProductSpecificationField> Features { get; set; }
        public int StockQuantity { get; set; }
        public bool IsArchived { get; set; }
        public bool IsPublished { get; set; }
    }
}
