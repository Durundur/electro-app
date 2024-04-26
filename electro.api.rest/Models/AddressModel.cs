namespace electro.api.rest.Models
{
    public class AddressModel : BaseModel
    {
        public string Country { get; set; }
        public string Street { get; set; }
        public string BuildingNumber { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        public UserModel User { get; set; }

    }
}
