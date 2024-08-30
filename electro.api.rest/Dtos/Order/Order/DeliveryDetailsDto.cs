using electro.api.rest.Models.Address;
using electro.api.rest.Models.Price;
using electro.api.rest.Models.Recipient;

namespace electro.api.rest.DTOs.Order.Order
{
    public class DeliveryDetailsDto
    {
        public string Method { get; set; }
        public string? TrackingNumber { get; set; }
        public PriceBase Cost { get; set; }
        public RecipientBase Recipient { get; set; }
        public AddressBase Address { get; set; }
    }
}
