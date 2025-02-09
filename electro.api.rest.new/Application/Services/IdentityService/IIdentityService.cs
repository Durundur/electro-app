using Domain.Aggregates.UserAggregate;

namespace Application.Services.IdentityService
{
    public interface IIdentityService
    {
        Task<IUser> FindUserByEmailAsync(string email);
        Task<IUser> FindUserByIdAsync (Guid id);
        Task<bool> CheckPasswordAsync(Guid userId, string password);
        Task<IList<string>> GetRolesAsync(Guid userId);
        Task UpdateRefreshTokenAsync(Guid userId, string refreshToken, DateTime refreshTokenExpiry);
        Task<IUser> CreateUserAsync(string email, string password, IList<string> roles);
    }
}
