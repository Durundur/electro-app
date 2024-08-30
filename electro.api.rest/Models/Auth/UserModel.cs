using electro.api.rest.Models.Address;
using electro.api.rest.Models.Address.Address;
using electro.api.rest.Models.Opinion;
using electro.api.rest.Models.Order;
using electro.api.rest.Models.Recipient;
using Microsoft.AspNetCore.Identity;

namespace electro.api.rest.Models.Auth
{
    public class UserModel : IdentityUser<Guid>
    {
        public string? FirstName { set; get; }
        public string? LastName { set; get; }
        public bool IsActive { set; get; }
        public string? RefreshToken { set; get; }
        public DateTime RefreshTokenExpiry { set; get; }
        public IList<SavedDeliveryAddressModel> Address { get; set; } = new List<SavedDeliveryAddressModel>();
        public IList<OpinionModel> Opinions { set; get; } = new List<OpinionModel>();
        public IList<OrderModel> Orders { set; get; } = new List<OrderModel>();
        public IList<SavedOrderRecipientModel> Recipients { set; get; } = new List<SavedOrderRecipientModel>();

    }
}
