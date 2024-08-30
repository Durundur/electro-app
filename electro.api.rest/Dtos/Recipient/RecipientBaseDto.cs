using electro.api.rest.Models.Recipient;

namespace electro.api.rest.DTOs.Recipient
{
    public class RecipientBaseDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Type { get; set; }
        public string? NIP { get; set; }
        public string? CompanyName { get; set; }
    }
}

