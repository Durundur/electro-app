using electro.api.rest.Models;

namespace electro.api.rest.Dtos
{
    public class ProductSummaryDto
    {
        public Guid Id { get; set; }
        public GroupSummaryDto Group { get; set; }
        public GroupSummaryDto Category { get; set; }
        public GroupSummaryDto SubCategory { get; set; }
        public string Name { get; set; }
        public ProductPrice Price { get; set; }
        public string Photo { get; set; }
        public List<ProductSpecificationField> Features { get; set; }
        public int StockQuantity { get; set; }
    }
}
