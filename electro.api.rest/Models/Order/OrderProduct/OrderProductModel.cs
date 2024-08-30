using electro.api.rest.Models.Price;
using electro.api.rest.Models.Product;

namespace electro.api.rest.Models.Order.OrderItem
{
    public class OrderProductModel
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public ProductModel Product { get; set; }
        public Guid OrderId { get; set; }
        public OrderModel Order { get; set; }
        public int Quantity { get; set; }
        public ProductPrice Price { get; set; }
    }
}
