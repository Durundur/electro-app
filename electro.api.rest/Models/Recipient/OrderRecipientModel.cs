using electro.api.rest.Models.Auth;
using electro.api.rest.Models.Order.DeliveryDetails;

namespace electro.api.rest.Models.Recipient
{
    public class OrderRecipientModel: RecipientBase
    {
        public Guid Id { get; set; }
        public Guid DeliveryDetailsId { get; set; }
        public DeliveryDetailsModel DeliveryDetails { get; set; }
    }
}
