﻿using Domain.Aggregates.UserAggregate;

namespace Graphql.Application.Mutations.Inputs
{
    public class CreateOrUpdateRecipientInput
    {
        public Guid? Id { get; set; }
        public Guid UserId { get; set; }
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
