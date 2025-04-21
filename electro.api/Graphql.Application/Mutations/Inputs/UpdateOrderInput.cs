using Domain.Aggregates.OrderAggregate;
using Domain.Aggregates.UserAggregate;

namespace Graphql.Application.Mutations.Inputs
{
    public class UpdateOrderInput
    {
        public Guid OrderId { get; set; }
        public OrderStatus Status { get; set; }
        public string? TrackingNumber { get; set; }
        public UpdateOrderRecipientInput? Recipient { get; set; }
    }

    public class UpdateOrderRecipientInput
    {
        public RecipientType Type { get; set; }
        public string? FirstName { get; set; }
        public string? Surname { get; set; }
        public string? CompanyName { get; set; }
        public string? TaxIdentificationNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
    }
}
