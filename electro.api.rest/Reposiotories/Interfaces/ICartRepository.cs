using electro.api.rest.Dtos.Cart;
using electro.api.rest.DTOs.Cart;
using electro.api.rest.Models.Cart;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface ICartRepository
    {
        Task<CartModel> GetUserCart(Guid userId);
        Task<VerifyCartResultDto> VerifyCart(CartDto verifyCartDto);
        Task<CartModel> UpdateUserCart(CartModel cart, Guid userId);
    }
}
