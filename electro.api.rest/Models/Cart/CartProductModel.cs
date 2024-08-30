using electro.api.rest.Models.Product;

namespace electro.api.rest.Models.Cart
{
    public class CartProductModel
    {
        public Guid Id { get; set; }
        public ProductModel Product { get; set; }
        public Guid ProductId { get; set; }
        public CartModel Cart { get; set; }
        public Guid CartId { get; set; }
        public int Quantity { get; set; }
    }
}
