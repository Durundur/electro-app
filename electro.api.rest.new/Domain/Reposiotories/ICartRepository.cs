using Domain.Aggregates.CartAggregate;

namespace Domain.Reposiotories
{
    public interface ICartRepository
    {
        Task<Cart> GetCartByUserIdAsync(Guid userId);
        Task DeleteUserCartAsync(Guid userId);
        void AddCart(Cart cart);
    }
}
