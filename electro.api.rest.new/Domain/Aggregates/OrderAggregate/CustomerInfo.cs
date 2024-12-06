namespace Domain.Aggregates.OrderAggregate
{
    public class CustomerInfo
    {
        public string RecipientName { get; private set; }
        public string Email { get; private set; }
        public string PhoneNumber { get; private set; }
        public string CompanyName { get; private set; }
        public string TaxId { get; private set; }
        public bool IsCompany => !string.IsNullOrEmpty(CompanyName) && !string.IsNullOrEmpty(TaxId);

        private CustomerInfo() { }

        public CustomerInfo(string recipientName, string email, string phoneNumber, string companyName = null, string taxId = null)
        {
            RecipientName = recipientName;
            Email = email;
            PhoneNumber = phoneNumber;
            CompanyName = companyName;
            TaxId = taxId;
        }
    }
}
