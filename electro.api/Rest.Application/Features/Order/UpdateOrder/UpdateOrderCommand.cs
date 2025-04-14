using Domain.Aggregates.OrderAggregate;
using Domain.Aggregates.UserAggregate;
using MediatR;

namespace Rest.Application.Features.Order.UpdateOrder
{
    public class UpdateOrderCommand : IRequest<UpdateOrderResult>
    {
        public Guid OrderId { get; set; }
        public OrderStatus Status { get; set; }
        public string? TrackingNumber { get; set; }
        public UpdateOrderCommandRecipient? Recipient { get; set; }
    }

    public class UpdateOrderCommandRecipient
    {
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
