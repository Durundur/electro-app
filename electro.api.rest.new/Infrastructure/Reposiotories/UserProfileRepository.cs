using Application.Reposiotories;
using Domain.Aggregates.UserProfileAggregate;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Reposiotories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        protected readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddUserProfileAsync(UserProfile userProfile, CancellationToken cancellationToken)
        {
            await _context.UserProfiles.AddAsync(userProfile, cancellationToken);
        }

        public async Task<UserProfile> GetUserProfileByIdAsync(Guid id)
        {
            var userProfile = await _context.UserProfiles.FirstOrDefaultAsync(up => up.Id == id);
            return userProfile;
        }

        public async Task<UserProfile> GetUserProfileByUserIdentityIdAsync(Guid userIdentityId)
        {
            var userProfile = await _context.UserProfiles.FirstOrDefaultAsync(up => up.UserIdentityId == userIdentityId);
            return userProfile;
        }
    }
}
