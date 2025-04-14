using Domain.Aggregates.OrderAggregate;
using Domain.Aggregates.UserAggregate;
using MediatR;

namespace Rest.Application.Features.Order.CreateOrder
{
    public class CreateOrderCommand : IRequest<CreateOrderResult>
    {
        public IList<CreateOrderCommandOrderProduct> Products { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public CreateOrderCommandRecipient Recipient { get; set; }
    }

    public class CreateOrderCommandOrderProduct
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CreateOrderCommandRecipient
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
