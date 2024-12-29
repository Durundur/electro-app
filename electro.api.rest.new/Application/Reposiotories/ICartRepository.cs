using Domain.Aggregates.CartAggregate;

namespace Application.Reposiotories
{
    public interface ICartRepository
    {
        Task<Cart> GetCartByUserIdAsync(Guid userId);
        Task SaveChangesAsync();
        void AddCart(Cart cart);
    }
}
