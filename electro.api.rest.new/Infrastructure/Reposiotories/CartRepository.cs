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

        public void AddCart(Cart cart)
        {
            _context.Carts.Add(cart);

        }

        public async Task<Cart> GetCartByUserIdAsync(Guid userId)
        {
            return await _context.Carts.Include(c => c.Products).FirstOrDefaultAsync(c => c.UserId == userId);
        }

        public async Task DeleteUserCartAsync(Guid userId)
        {
            var userCart = await _context.Carts.Include(c => c.Products).FirstOrDefaultAsync(c => c.UserId == userId);

            if (userCart != null)
            {
                _context.Carts.Remove(userCart);
            }
        }
    }
}
