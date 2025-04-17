using Application.Services.Models;
using Domain.Aggregates.CartAggregate;
using Domain.Aggregates.UserAggregate;

namespace Application.Services.CartService
{
    public interface ICartService
    {
        Task<Cart> GetCartByUserIdAsync(Guid userId, CancellationToken cancellationToken);
        Task<List<Recipient>> GetUserRecipientsByUserIdAsync(Guid userId, CancellationToken cancellationToken);
        Task<(Cart cart, List<string> errors)> ValidateAndSaveCartAsync(Guid? userId, List<ValidateCartProductModel> model, CancellationToken cancellationToken);
        Task<bool> DeleteRecipientAsync(Guid recipientId, Guid userId, CancellationToken cancellationToken);
        Task<Recipient> CreateOrUpdateRecipientAsync(RecipientModel model, Guid? recipientId, Guid userId, CancellationToken cancellationToken);
    }
}
