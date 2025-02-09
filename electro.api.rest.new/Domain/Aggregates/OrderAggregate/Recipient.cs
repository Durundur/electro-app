using Domain.Aggregates.UserAggregate;

namespace Domain.Aggregates.OrderAggregate
{
    public class Recipient
    {
        public string? FirstName { get; private set; }
        public string? Surname { get; private set; }
        public string? CompanyName { get; private set; }
        public string? TaxIdentificationNumber { get; private set; }
        public RecipientType Type { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Street { get; private set; }
        public string HouseNumber { get; private set; }
        public string PostalCode { get; private set; }
        public string City { get; private set; }

        private Recipient() { }

        public static Recipient Create(RecipientType type, string? firstName, string? surname, string? companyName, string? taxIdentificationNumber, string phoneNumber, string street, string houseNumber, string postalCode, string city)
        {
            var recipient = new Recipient
            {
                Type = type,
                PhoneNumber = phoneNumber,
                Street = street,
                HouseNumber = houseNumber,
                PostalCode = postalCode,
                City = city
            };

            recipient.SetDetails(type, firstName, surname, companyName, taxIdentificationNumber);

            return recipient;
        }

        public void Update(RecipientType type, string? firstName, string? surname, string? companyName, string? taxIdentificationNumber, string phoneNumber, string street, string houseNumber, string postalCode, string city)
        {
            Type = type;
            PhoneNumber = phoneNumber;
            Street = street;
            HouseNumber = houseNumber;
            PostalCode = postalCode;
            City = city;

            SetDetails(type, firstName, surname, companyName, taxIdentificationNumber);
        }

        private void SetDetails(RecipientType type, string? firstName, string? surname, string? companyName, string? taxIdentificationNumber)
        {
            if (type == RecipientType.Personal)
            {
                if (string.IsNullOrWhiteSpace(firstName) || string.IsNullOrWhiteSpace(surname))
                {
                    throw new ArgumentException("Personal recipient must have both a first name and surname");
                }

                FirstName = firstName;
                Surname = surname;
                CompanyName = null;
                TaxIdentificationNumber = null;
            }
            else if (type == RecipientType.Company)
            {
                if (string.IsNullOrWhiteSpace(companyName) || string.IsNullOrWhiteSpace(taxIdentificationNumber))
                {
                    throw new ArgumentException("Company recipient must have both a company name and tax identification number");
                }

                CompanyName = companyName;
                TaxIdentificationNumber = taxIdentificationNumber;
                FirstName = null;
                Surname = null;
            }
            else
            {
                throw new ArgumentException("Invalid recipient type");
            }
        }
    }
}
