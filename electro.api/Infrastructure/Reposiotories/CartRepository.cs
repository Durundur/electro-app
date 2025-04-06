using Domain.Reposiotories;
using Domain.Aggregates.CartAggregate;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Reposiotories
{
    public class CartRepository : ICartRepository
    {
        private readonly ApplicationDbContext _context;

        public CartRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Cart> AddCartAsync(Cart cart, CancellationToken cancellationToken)
        {
            var entry = await _context.Carts.AddAsync(cart, cancellationToken);
            return entry.Entity;
        }

        public async Task<Cart> GetCartByUserIdAsync(Guid userId, CancellationToken cancellationToken)
        {
            return await _context.Carts.Include(c => c.Products).FirstOrDefaultAsync(c => c.UserId == userId, cancellationToken);
        }

        public async Task DeleteUserCartAsync(Guid userId, CancellationToken cancellationToken)
        {
            var userCart = await _context.Carts.Include(c => c.Products).FirstOrDefaultAsync(c => c.UserId == userId, cancellationToken);

            if (userCart != null)
            {
                _context.Carts.Remove(userCart);
            }
        }
    }
}
