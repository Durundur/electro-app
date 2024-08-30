using System.ComponentModel.DataAnnotations.Schema;

namespace electro.api.rest.Models.Product
{
    public class ProductSpecificationModel
    {
        public Guid Id { get; set; }
        public IEnumerable<ProductSpecificationField> Specification { get; set; }
        public Guid ProductId { get; set; }
        public ProductModel Product { get; set; }

    }

    public class ProductSpecificationField
    {
        public string FieldName { get; set; }
        public IList<string> FieldValue { get; set; }
    }
}
