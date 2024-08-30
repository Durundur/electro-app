using electro.api.rest.Dtos.Cart;
using electro.api.rest.Models.Price;

namespace electro.api.rest.DTOs.Order.Order
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public string Status { get; set; }
        public PriceBase TotalPrice { get; set; }
        public IEnumerable<CartProductDto> Products { get; set; }
        public PaymentDetailsDto Payment { get; set; }
        public DeliveryDetailsDto DeliveryDetails { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
