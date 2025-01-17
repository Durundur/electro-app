using Application.Reposiotories;
using Domain.Aggregates.OrderAggregate;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Reposiotories
{
    public class OrderRepository : IOrderRepository
    {
        protected readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddOrderAsync(Order order, CancellationToken cancellationToken)
        {
            await _context.Orders.AddAsync(order, cancellationToken);
        }

        public IQueryable<Order> GetOrdersQuery()
        {
            return _context.Orders.AsQueryable();
        }

        public async Task<Order> GetOrderByIdAsync(Guid id)
        {
            return await _context.Orders
                .Include(o => o.Products)
                .Include(o => o.Delivery)
                .Include(o => o.Recipient)
                .Include(o => o.Payment).FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
