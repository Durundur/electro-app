using electro.api.rest.Models.Auth;
using electro.api.rest.Models.Order.DeliveryDetails;
using electro.api.rest.Models.Order.OrderItem;
using electro.api.rest.Models.Order.Payment;

namespace electro.api.rest.Models.Order
{
    public class OrderModel: BaseModel
    {
        public int Number { get; set; }
        public Guid UserId { get; set; }
        public UserModel User { get; set; }
        public OrderStatus Status { get; set; }
        public PaymentDetailsModel Payment { get; set; }
        public DeliveryDetailsModel DeliveryDetails { get; set; }
        public IEnumerable<OrderProductModel> Products { get; set; }
    }
}
