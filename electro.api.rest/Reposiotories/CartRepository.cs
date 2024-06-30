using electro.api.rest.Dtos;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Reposiotories
{
    public class CartRepository : ICartRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public CartRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        
        public async Task<CartModel> UpdateCart(CartModel cart, Guid userId)
        {
            var existingCart = await _dbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (existingCart != null)
            {
                existingCart.TotalPrice = cart.TotalPrice;
                existingCart.Products = cart.Products;
                existingCart.ProductsCount = cart.ProductsCount;
            }
            else
            {
                var newCart = new CartModel
                {
                    UserId = userId,
                    Products = cart.Products,
                    ProductsCount = cart.ProductsCount,
                    TotalPrice = cart.TotalPrice
                };
                await _dbContext.Carts.AddAsync(newCart);
                existingCart = newCart;
            }
            return existingCart;
        }

        
        public async Task<CartVerificationResponse> VerifyCart(CartModel cart)
        {
            var response = new CartVerificationResponse
            {
                Cart = new CartModel
                {
                    Products = new List<CartProduct>(),
                },
                Messages = new List<string>()
            };

            var productsIds = cart.Products.Select(cp => cp.ProductId).ToList();
            var products = await _dbContext.Products.Where(p => productsIds.Contains(p.Id)).ToListAsync();
            var productDic = products.ToDictionary(p => p.Id);
            decimal totalPrice = 0;
            foreach (var cartProduct in cart.Products)
            {

                if (!productDic.TryGetValue(cartProduct.ProductId, out var product))
                {
                    response.Messages.Add($"Produkt o ID {cartProduct.ProductId} nie został znaleziony.");
                    continue;
                }
                cartProduct.Product = product;
                cartProduct.Price = product.Price;
                cartProduct.Name = product.Name;
                var photoBytes = product.Photos.FirstOrDefault();
                if (photoBytes != null)
                {
                    cartProduct.Photo = "data:image/jpeg;charset=utf-8;base64," + Convert.ToBase64String(photoBytes);
                }
                if (cartProduct.Count == 0)
                {
                    continue;
                }
                if (cartProduct.Count > product.StockQuantity)
                {
                    response.Messages.Add($"Żądana ilość produktu {product.Name} przekracza dostępny stan.");
                    cartProduct.Count = product.StockQuantity;
                }
                totalPrice += cartProduct.Price.Price * cartProduct.Count;
                response.Cart.Products.Add(cartProduct);

            }
            response.Cart.TotalPrice = totalPrice;
            response.Cart.ProductsCount = response.Cart.Products.Sum(p => p.Count);
            return response;
        }

        
        public async Task<CartModel> GetUserCart(Guid userId)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) throw new InvalidOperationException("Nie znaleziono użytkownika.");
            var cart = await _dbContext.Carts
                .Include(c => c.Products)
                .ThenInclude(cp => cp.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            foreach (var cartProduct in cart.Products)
            {
                var product = cartProduct.Product;
                var photoBytes = product.Photos.FirstOrDefault();
                if (photoBytes != null)
                {
                    cartProduct.Photo = "data:image/jpeg;charset=utf-8;base64," + Convert.ToBase64String(photoBytes);
                }
                cartProduct.Name = product.Name;
                cartProduct.Price = product.Price;
            }
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
