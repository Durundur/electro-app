using Microsoft.AspNetCore.Identity;

namespace electro.api.rest.Models
{
    public class UserModel : IdentityUser<Guid>
    {
        public string? FirstName { set; get; }
        public string? LastName { set; get; }
        public bool IsActive { set; get; }
        public string? RefreshToken { set; get; }
        public DateTime RefreshTokenExpiry { set; get; }
        public IList<AddressModel> Address { get; set; } = new List<AddressModel>();
        public IList<OpinionModel> Opinions { set; get; } = new List<OpinionModel>();

    }
}
