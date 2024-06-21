using System.ComponentModel.DataAnnotations.Schema;

namespace electro.api.rest.Models
{
    public class CartModel: BaseModel
    {
        public UserModel User { get; set; }
        public Guid UserId { get; set; }
        public int ProductsCount { get; set; }
        public decimal TotalPrice { get; set; }
        public List<CartProduct> Products { get; set; }
    }

    public class CartProduct
    {
        public ProductModel Product { get; set; }
        [ForeignKey(nameof(ProductModel))]
        public Guid Id { get; set; }
        public int Count { get; set; }
        [NotMapped]
        public ProductPrice Price { get; set; }
        public string Name { get; set; }
    }
}
