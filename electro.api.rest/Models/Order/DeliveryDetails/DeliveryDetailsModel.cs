using electro.api.rest.Models.Address.Address;
using electro.api.rest.Models.Price;
using electro.api.rest.Models.Recipient;

namespace electro.api.rest.Models.Order.DeliveryDetails
{
    public class DeliveryDetailsModel
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public OrderModel Order { get; set; }
        public DeliveryMethod Method { get; set; }
        public string? TrackingNumber { get; set; }
        public PriceBase Cost { get; set; }
        public OrderRecipientModel Recipient { get; set; }
        public DeliveryAddressModel Address { get; set; }
    }
}
