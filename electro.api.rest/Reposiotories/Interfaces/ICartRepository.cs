using electro.api.rest.Dtos;
using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface ICartRepository
    {
        Task<CartModel> GetUserCart(Guid userId);
        Task<CartVerificationResponse> VerifyCart(CartModel cart);
        Task<CartModel> UpdateCart(CartModel cart, Guid userId);
    }
}
