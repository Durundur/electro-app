using Application.Models.Identity;
using System.Security.Claims;

namespace Application.Services.TokenService
{
    public interface ITokenService
    {
        string GenerateToken(UserIdentity user, IList<string> roles);
        DateTime GetRefreshTokenExpiry();
        string GenerateRefreshToken();
        ClaimsPrincipal GetTokenPrincipal(string token);
    }
}
