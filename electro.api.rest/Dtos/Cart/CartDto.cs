using electro.api.rest.Models.Price;

namespace electro.api.rest.Dtos.Cart
{
    public class CartDto
    {
        public int ProductsCount { get; set; }
        public PriceBase TotalPrice { get; set; }
        public IEnumerable<CartProductDto> Products { get; set; }
    }
}
