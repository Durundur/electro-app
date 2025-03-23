using Domain.Aggregates.UserAggregate;
using System.Security.Claims;

namespace Application.Services.TokenService
{
    public interface ITokenService
    {
        (string, DateTime) GenerateToken(IUser user, IList<string> roles);
        (string, DateTime) GenerateRefreshToken();
        ClaimsPrincipal GetTokenPrincipal(string token);
    }
}
