using electro.api.rest.Models.Price;

namespace electro.api.rest.DTOs.Order.OrderCreate
{
    public class OrderCreateDeliveryDetailsDto
    {
        public string Method { get; set; }
        public PriceBase Cost { get; set; }
    }
}
