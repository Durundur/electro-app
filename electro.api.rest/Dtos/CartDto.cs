using electro.api.rest.Models;

namespace electro.api.rest.Dtos
{
    public class CartDto
    {
        public string UserId { get; set; }
        public int ProductsCount { get; set; }
        public decimal TotalPrice { get; set; }
        public List<CartProductDto> Products { get; set; }
    }

    public class CartProductDto
    {
        public string Id { get; set; }
        public int Count { get; set; }
        public ProductPrice Price { get; set; }
        public string Name { get; set; }
        public string Photo {  get; set; }
    }
}
