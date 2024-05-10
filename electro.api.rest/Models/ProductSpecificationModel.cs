using System.ComponentModel.DataAnnotations.Schema;

namespace electro.api.rest.Models
{
    public class ProductSpecificationModel
    {
        public Guid Id { get; set; }
        public List<ProductSpecificationField> Specification { get; set; }
        public Guid ProductId { get; set; }
        public ProductModel Product { get; set; }
       
    }

    public class ProductSpecificationField
    {
        public string FieldName { get; set; }
        public List<string> FieldValue { get; set; }
    }
}
