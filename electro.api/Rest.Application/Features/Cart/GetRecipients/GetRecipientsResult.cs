using Domain.Aggregates.UserAggregate;

namespace Rest.Application.Features.Cart.GetRecipients
{
    public class GetRecipientsResult
    {
        public IList<GetRecipientsResultItem> Recipients { get; set; }
    }

    public class GetRecipientsResultItem
    {
        public Guid Id { get; set; }
        public string? FirstName { get; set; }
        public string? Surname { get; set; }
        public string? CompanyName { get; set; }
        public string? TaxIdentificationNumber { get; set; }
        public RecipientType Type { get; set; }
        public string PhoneNumber { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
    }
}
