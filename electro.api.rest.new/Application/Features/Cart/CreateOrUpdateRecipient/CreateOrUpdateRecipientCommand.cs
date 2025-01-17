using Domain.Aggregates.UserProfileAggregate;
using MediatR;
using System.Text.Json.Serialization;

namespace Application.Features.Cart.CreateOrUpdateRecipient
{
    public class CreateOrUpdateRecipientCommand: IRequest<CreateOrUpdateRecipientResult>
    {
        public Guid? Id { get; set; }
        [JsonIgnore]
        public Guid UserProfileId { get; set; }
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
