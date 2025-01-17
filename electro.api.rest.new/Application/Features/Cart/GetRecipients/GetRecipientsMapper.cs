using Domain.Aggregates.UserProfileAggregate;

namespace Application.Features.Cart.GetRecipients
{
    public static class GetRecipientsMapper
    {
        public static GetRecipientsResult MapToGetRecipientsResult(IList<Recipient> recipients)
        {
            return new GetRecipientsResult
            {
                Recipients = recipients.Select(recipient => MapToGetRecipientsResultItem(recipient)).ToList()
            };
        }

        public static GetRecipientsResultItem MapToGetRecipientsResultItem(Recipient recipient)
        {
            return new GetRecipientsResultItem
            {
                Id = recipient.Id,
                Type = recipient.Type,
                PhoneNumber = recipient.PhoneNumber,
                Street = recipient.Street,
                HouseNumber = recipient.HouseNumber,
                PostalCode = recipient.PostalCode,
                City = recipient.City,
                FirstName = recipient.FirstName,
                Surname = recipient.Surname,
                CompanyName = recipient.CompanyName,
                TaxIdentificationNumber = recipient.TaxIdentificationNumber,
            };
        }
    }
}
