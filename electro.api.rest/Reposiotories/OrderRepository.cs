using electro.api.rest.Models;
using electro.api.rest.Models.Order;
using electro.api.rest.Models.Order.Payment;
using electro.api.rest.Models.Price;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Reposiotories
{
    public class OrderRepository: IOrderRepository
    {
        private readonly ApplicationDbContext context;
        public OrderRepository(ApplicationDbContext context) 
        {
            this.context = context;
        }
        public IQueryable<OrderModel> GetUserOrders(Guid userId)
        {
            var query = context.Orders
                .Include(o => o.Products).ThenInclude(op => op.Product)
                .Include(o => o.Payment)
                .Include(o => o.DeliveryDetails).ThenInclude(dd => dd.Address)
                .Include(o => o.DeliveryDetails).ThenInclude(dd => dd.Recipient)
                .OrderByDescending(o => o.CreatedAt)
                .Where(o => o.UserId == userId);
            return query;
        }

        public IQueryable<OrderModel> GetOrderById(Guid id) 
        {
            var order = context.Orders
                .AsNoTracking()
                .AsSplitQuery()
                .Include(o => o.Products).ThenInclude(op => op.Product)
                .Include(o => o.DeliveryDetails).ThenInclude(dd => dd.Recipient)
                .Include(o => o.DeliveryDetails).ThenInclude(dd => dd.Address)
                .Include(o => o.Payment).Where(o => o.Id == id);
            return order;
        }

        public IQueryable<OrderModel> GetOrderByIdForUser(Guid orderId, Guid userId)
        {
            var order = GetOrderById(orderId).Where(o => o.UserId == userId);
            return order;
        }

        public async Task<OrderModel> CreateOrder(OrderModel order)
        {
            order.Status = OrderStatus.New;
            order.Payment.Status = PaymentStatus.Started;
            
            foreach (var orderProduct in order.Products)
            {
                var product = await context.Products
                    .FirstOrDefaultAsync(p => p.Id == orderProduct.ProductId);

                if (product != null)
                {
                    orderProduct.Product = product;
                    orderProduct.Price = new ProductPrice(product.Price.Value, "PLN", product.Price.OldPriceValue);
                }
                else
                {
                    throw new Exception($"Product with ID {orderProduct.ProductId} not found.");
                }
            }
            context.Orders.Add(order);
            return order;
        }
    }
}
