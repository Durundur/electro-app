using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface ICartRepository
    {
        Task<CartModel> GetCart(Guid userId);
    }
}
