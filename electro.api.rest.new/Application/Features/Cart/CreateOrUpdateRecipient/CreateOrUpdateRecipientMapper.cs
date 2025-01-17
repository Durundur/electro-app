using Domain.Aggregates.UserProfileAggregate;

namespace Application.Features.Cart.CreateOrUpdateRecipient
{
    public static class CreateOrUpdateRecipientMapper
    {
        public static CreateOrUpdateRecipientResult MapToCreateOrUpdateRecipientResult(Recipient recipient)
        {
            return new CreateOrUpdateRecipientResult
            {
                Id = recipient.Id,
                FirstName = recipient.FirstName,
                Surname = recipient.Surname,
                CompanyName = recipient.CompanyName,
                TaxIdentificationNumber = recipient.TaxIdentificationNumber,
                Street = recipient.Street,
                HouseNumber = recipient.HouseNumber,
                PostalCode = recipient.PostalCode,
                City = recipient.City,
                PhoneNumber = recipient.PhoneNumber,
                Type = recipient.Type,
            };
        }
    }
}
