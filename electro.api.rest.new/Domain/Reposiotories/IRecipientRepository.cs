using Domain.Aggregates.UserAggregate;

namespace Domain.Reposiotories
{
    public interface IRecipientRepository
    {
        Task<IList<Recipient>> GetUserRecipientsAsync(Guid userProfileId, CancellationToken cancellationToken);
        Task<Recipient> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task AddRecipientAsync(Recipient recipient, CancellationToken cancellationToken);
        void DeleteRecipient(Recipient recipient);
    }
}
