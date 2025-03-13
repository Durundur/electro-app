using Domain.Aggregates.CartAggregate;

namespace Domain.Reposiotories
{
    public interface ICartRepository
    {
        Task<Cart> GetCartByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
        Task DeleteUserCartAsync(Guid userId, CancellationToken cancellationToken = default);
        Task<Cart> AddCartAsync(Cart cart, CancellationToken cancellationToken = default);
    }
}
