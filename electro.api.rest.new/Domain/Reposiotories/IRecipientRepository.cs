using Domain.Aggregates.UserAggregate;

namespace Domain.Reposiotories
{
    public interface IRecipientRepository
    {
        Task<IList<Recipient>> GetUserRecipientsAsync(Guid userProfileId, CancellationToken cancellationToken = default);
        Task<Recipient> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<Recipient> AddRecipientAsync(Recipient recipient, CancellationToken cancellationToken = default);
        Task DeleteRecipientAsync(Guid recipientId, CancellationToken cancellationToken = default);
    }
}
