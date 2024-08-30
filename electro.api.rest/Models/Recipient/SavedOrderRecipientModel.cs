using electro.api.rest.Models.Auth;

namespace electro.api.rest.Models.Recipient
{
    public class SavedOrderRecipientModel : RecipientBase
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public UserModel User { get; set; }
    }
}
