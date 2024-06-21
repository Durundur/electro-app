using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Reposiotories
{
    public class CartRepository: ICartRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public CartRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CartModel> UpdateCart(CartModel cart, Guid userId)
        {
           
        }

        public async Task<CartModel> GetCart(Guid userId)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) { throw new InvalidOperationException(); }

            var cart = await _dbContext.Carts
                .Include(c => c.Products.Select(p => p.Product))
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new CartModel
                {
                    User = user,
                    UserId = userId,
                    ProductsCount = 0,
                    TotalPrice = 0,
                    Products = new List<CartProduct>()
                };
                _dbContext.Carts.Add(cart);
            }
            return cart;
        }


    }
}
