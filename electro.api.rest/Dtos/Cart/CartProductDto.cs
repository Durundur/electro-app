using electro.api.rest.Models.Price;

namespace electro.api.rest.Dtos.Cart
{
    public class CartProductDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public ProductPrice Price { get; set; }
        public string Name { get; set; }
        public string? Photo { get; set; }
    }
}
