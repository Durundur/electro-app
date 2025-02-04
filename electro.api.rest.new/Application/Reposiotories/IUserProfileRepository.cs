using Domain.Aggregates.UserProfileAggregate;

namespace Application.Reposiotories
{
    public interface IUserProfileRepository
    {
        Task AddUserProfileAsync(UserProfile userProfile, CancellationToken cancellationToken);
        Task<UserProfile> GetUserProfileByIdAsync(Guid id);
        Task<UserProfile> GetUserProfileByUserIdentityIdAsync(Guid userIdentityId);
    }
}
