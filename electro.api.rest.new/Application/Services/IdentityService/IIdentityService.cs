using Application.Models.Identity;

namespace Application.Services.IdentityService
{
    public interface IIdentityService
    {
        Task<UserIdentity> FindUserByEmailAsync(string email);
        Task<UserIdentity> FindUserByIdAsync(Guid id);
        Task<bool> CheckPasswordAsync(Guid userId, string password);
        Task<IList<string>> GetRolesAsync(Guid userId);
        Task UpdateRefreshTokenAsync(Guid userId, string refreshToken, DateTime refreshTokenExpiry);
        Task<UserIdentity> CreateUserAsync(string email, string password, IList<string> roles);
    }
}
