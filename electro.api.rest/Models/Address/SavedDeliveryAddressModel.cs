using electro.api.rest.Models.Auth;

namespace electro.api.rest.Models.Address
{
    public class SavedDeliveryAddressModel : AddressBase
    {
        public Guid Id { get; set; }
        public UserModel User { get; set; }
        public Guid UserId { get; set; }
    }
}
