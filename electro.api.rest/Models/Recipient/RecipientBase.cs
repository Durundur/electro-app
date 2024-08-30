using System.ComponentModel.DataAnnotations;

namespace electro.api.rest.Models.Recipient
{
    public class RecipientBase
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public RecipientType RecipientType { get; set; }
        public string? NIP { get; set; }
        public string? CompanyName { get; set; }
    }
}
