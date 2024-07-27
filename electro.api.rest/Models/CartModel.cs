using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace electro.api.rest.Models
{
    public class CartModel: BaseModel
    {
        public UserModel User { get; set; }
        public Guid UserId { get; set; }
        public int ProductsCount { get; set; }
        public decimal TotalPrice { get; set; }
        public List<CartProductModel> Products { get; set; }
    }

    public class CartProductModel
    {
        public ProductModel Product { get; set; }
        public Guid ProductId { get; set; }
        public CartModel Cart { get; set; }
        public Guid CartId { get; set; }
        public int Count { get; set; }
        [NotMapped]
        public ProductPrice Price { get; set; }
        [NotMapped]
        public string Name { get; set; }
        [NotMapped]
        public string Photo {  get; set; } = string.Empty;
    }
}
