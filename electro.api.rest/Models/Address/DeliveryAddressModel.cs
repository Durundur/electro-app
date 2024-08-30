using electro.api.rest.Models.Order.DeliveryDetails;

namespace electro.api.rest.Models.Address.Address
{
    public class DeliveryAddressModel : AddressBase
    {
        public Guid Id { get; set; }
        public Guid DeliveryDetailsId { get; set; }
        public DeliveryDetailsModel DeliveryDetails { get; set; }
    }
}
