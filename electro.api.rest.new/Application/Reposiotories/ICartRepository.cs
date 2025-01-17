using Domain.Aggregates.CartAggregate;

namespace Application.Reposiotories
{
    public interface ICartRepository
    {
        Task<Cart> GetCartByUserIdAsync(Guid userId);
        Task DeleteUserCartAsync(Guid userId);
        void AddCart(Cart cart);
    }
}
