using electro.api.rest.Models;

namespace electro.api.rest.Dtos
{
    public class CartDto
    {
        public int ProductsCount { get; set; }
        public decimal TotalPrice { get; set; }
        public List<CartProductDto> Products { get; set; }
    }

    public class CartProductDto
    {
        public string ProductId { get; set; }
        public int Count { get; set; }
        public ProductPrice Price { get; set; }
        public string Name { get; set; }
        public string Photo {  get; set; }
    }

    public class CartVerificationResponse
    {
        public CartModel Cart { get; set; }
        public IList<string> Messages { get; set; }
    }

    public class CartVerificationResponseDto
    {
        public CartDto Cart { get; set; }
        public IList<string> Messages { get; set; }
    }
}
