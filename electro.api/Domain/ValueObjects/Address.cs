namespace Domain.ValueObjects
{
    public class Address
    { 
        public string Street { get; private set; }
        public string BuildingNumber { get; private set; }
        public string City { get; private set; }
        public string PostalCode { get; private set; }
        public string Country { get; private set; }

        public Address(string street, string buildingNumber, string city, string postalCode, string country)
        {
            Street = street;
            BuildingNumber = buildingNumber;
            City = city;
            PostalCode = postalCode;
            Country = country;
        }
    }
}
