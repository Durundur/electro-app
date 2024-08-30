using electro.api.rest.Dtos.Cart;
using electro.api.rest.DTOs.Cart;
using electro.api.rest.Models;
using electro.api.rest.Models.Cart;
using electro.api.rest.Models.Price;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Reposiotories
{
    public class CartRepository : ICartRepository
    {
        private readonly ApplicationDbContext dbContext;
        public CartRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<CartModel> UpdateUserCart(CartModel cart, Guid userId)
        {
            var existingCart = await dbContext.Carts.Include(c => c.Products).FirstOrDefaultAsync(c => c.UserId == userId);
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
                await dbContext.Carts.AddAsync(newCart);
                existingCart = newCart;
            }
            return existingCart;
        }

        
        public async Task<VerifyCartResultDto> VerifyCart(CartDto verifyCartDto)
        {
            var messagesList = new List<string>();
            var productsList = new List<CartProductDto>();
            decimal totalPrice = 0;

            var productsIds = verifyCartDto.Products.Select(cp => cp.ProductId).ToList();
            var products = await dbContext.Products.Where(p => productsIds.Contains(p.Id)).ToListAsync();
            var productDic = products.ToDictionary(p => p.Id);
            
            foreach (var cartProduct in verifyCartDto.Products)
            {
                if (!productDic.TryGetValue(cartProduct.ProductId, out var product))
                {
                    messagesList.Add($"Produkt o ID {cartProduct.ProductId} nie został znaleziony.");
                    continue;
                }
                if (cartProduct.Quantity == 0)
                {
                    continue;
                }
                if (cartProduct.Quantity > product.StockQuantity)
                {
                    messagesList.Add($"Żądana ilość produktu {product.Name} przekracza dostępny stan.");
                    cartProduct.Quantity = product.StockQuantity;
                }
                cartProduct.Price = product.Price;
                productsList.Add(cartProduct);
                totalPrice += cartProduct.Price.Value * cartProduct.Quantity;
            }
            var response = new VerifyCartResultDto()
            {
                Messages = messagesList.ToArray(),
                Products = productsList.ToArray(),
                ProductsCount = productsList.Sum(p => p.Quantity),
                TotalPrice = new PriceBase(totalPrice, "PLN")
            };
            return response;
        }


        public async Task<CartModel> GetUserCart(Guid userId)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) throw new InvalidOperationException("Nie znaleziono użytkownika.");
            var cart = await dbContext.Carts
                .Include(c => c.Products)
                .ThenInclude(cp => cp.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new CartModel
                {
                    User = user,
                    UserId = userId,
                    ProductsCount = 0,
                    TotalPrice = new PriceBase()
                    {
                        Currency = "PLN",
                        Value = 0
                    },
                    Products = new List<CartProductModel>()
                };
                dbContext.Carts.Add(cart);
            }
            return cart;
        }
    }
}
