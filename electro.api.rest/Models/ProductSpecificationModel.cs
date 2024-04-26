namespace electro.api.rest.Models
{
    public class ProductSpecificationModel
    {
        public Guid Id { get; set; }
        public string Specification { get; set; }
        public Guid ProductId { get; set; }
        public ProductModel Product { get; set; }
       
    }
}
