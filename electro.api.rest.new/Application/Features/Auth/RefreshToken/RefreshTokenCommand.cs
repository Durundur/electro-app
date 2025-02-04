using MediatR;

namespace Application.Features.Auth.RefreshToken
{
    public class RefreshTokenCommand: IRequest<RefreshTokenResult>
    {
        public string RefreshToken { get; set; }
        public string Token { get; set; }
    }
}
