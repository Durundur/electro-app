using Application.Features.Auth.Shared;

namespace Application.Features.Auth.RefreshToken
{
    public class RefreshTokenResult : TokenResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}

