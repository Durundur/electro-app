using Domain.Aggregates.OrderAggregate;
using Domain.Aggregates.UserAggregate;

namespace Graphql.Application.Mutations.Inputs
{

    public class CreateOrderInput
    {
        public IList<CreateOrderProductInput> Products { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public CreateOrderRecipientInput Recipient { get; set; }
    }

    public class CreateOrderProductInput
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CreateOrderRecipientInput
    {
        public RecipientType Type { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string? CompanyName { get; set; }
        public string? TaxIdentificationNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
    }
}
