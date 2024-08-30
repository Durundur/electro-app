using electro.api.rest.Dtos.Cart;
using electro.api.rest.DTOs.Recipient;
using electro.api.rest.Models.Address;

namespace electro.api.rest.DTOs.Order.OrderCreate
{
    public class OrderCreateDto
    {
        public string PaymentMethod { get; set; }
        public OrderCreateDeliveryDetailsDto DeliveryDetails { get; set; }
        public AddressBase DeliveryAddress { get; set; }
        public RecipientBaseDto Recipient { get; set; }
        public IEnumerable<CartProductDto> Products { get; set; }
    }
}
