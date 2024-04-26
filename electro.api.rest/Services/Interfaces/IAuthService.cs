using electro.api.rest.Dtos;

namespace electro.api.rest.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> Login(AuthRequestDto credentials);
        Task<AuthResponseDto> RefreshToken(RefreshTokenRequest jwt);
        Task<AuthResponseDto> Register(AuthRequestDto credentials);
    }
}