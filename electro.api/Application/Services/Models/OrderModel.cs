using Domain.Aggregates.OrderAggregate;

namespace Application.Services.Models
{
    public class OrderModel
    {
        public IList<OrderProductModel> Products { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public RecipientModel Recipient { get; set; }
    }
}
