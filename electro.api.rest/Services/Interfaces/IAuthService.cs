using electro.api.rest.Dtos.Auth;

namespace electro.api.rest.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthDto> Login(LoginDto credentials);
        Task<AuthDto> RefreshToken(RefreshTokenDto jwt);
        Task<AuthDto> Register(RegisterDto credentials);
    }
}