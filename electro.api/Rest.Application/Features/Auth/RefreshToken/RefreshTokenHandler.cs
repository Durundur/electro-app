using MediatR;
using Application.Exceptions;
using Application.Services.AuthService;
using Application.Services.Models;

namespace Rest.Application.Features.Auth.RefreshToken
{
    public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenResult>
    {
        private readonly IAuthService _authService;

        public RefreshTokenHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<RefreshTokenResult> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            try
            {
                return await _authService.RefreshTokenAsync(request.RefreshToken, request.Token, cancellationToken);
            }
            catch (UnauthorizedException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"An error occurred during token refresh.", ex);
            }
        }
    }
}
