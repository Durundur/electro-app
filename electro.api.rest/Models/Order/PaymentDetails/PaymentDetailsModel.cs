namespace electro.api.rest.Models.Order.Payment
{
    public class PaymentDetailsModel
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public OrderModel Order { get; set; }
        public PaymentStatus Status { get; set; }
        public PaymentMethod Method { get; set; }
    }
}
