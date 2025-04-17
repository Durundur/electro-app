using Application.Services.Models;

namespace Application.Services.AuthService
{
    public interface IAuthService
    {
        Task<LoginUserResult> LoginUserAsync(string email, string password, CancellationToken cancellationToken);
        Task<bool> LogoutUserAsync(Guid userId, CancellationToken cancellationToken);
        Task<RegisterUserResult> RegisterUserAsync(string email, string password, CancellationToken cancellationToken);
        Task<RefreshTokenResult> RefreshTokenAsync(string refreshToken, string token, CancellationToken cancellationToken);

    }
}
