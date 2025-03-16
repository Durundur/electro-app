using Application.Services.IdentityService;
using Application.Services.TokenService;
using MediatR;
using System.Security.Claims;
using Application.Exceptions;

namespace Application.Features.Auth.RefreshToken
{
    public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenResult>
    {
        private readonly IIdentityService _identityService;
        private readonly ITokenService _tokenService;

        public RefreshTokenHandler(IIdentityService identityService, ITokenService tokenService)
        {
            _identityService = identityService;
            _tokenService = tokenService;
        }

        public async Task<RefreshTokenResult> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var principal = _tokenService.GetTokenPrincipal(request.Token);
                if (principal == null)
                {
                    throw new UnauthorizedException("Invalid JWT token");
                }

                var userId = principal.FindFirst(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    throw new UnauthorizedException("Invalid JWT token");
                }

                var user = await _identityService.FindUserByIdAsync(new Guid(userId.Value));
                if (user == null)
                {
                    throw new UnauthorizedException("Invalid JWT token");
                }

                if (string.IsNullOrEmpty(user.RefreshToken) ||
                    user.RefreshToken != request.RefreshToken ||
                    !user.RefreshTokenExpiry.HasValue ||
                    user.RefreshTokenExpiry.Value <= DateTime.UtcNow)
                {
                    throw new UnauthorizedException("Invalid or expired refresh token");
                }

                var roles = await _identityService.GetRolesAsync(user.Id);
                var token = _tokenService.GenerateToken(user, roles);
                var refreshToken = _tokenService.GenerateRefreshToken();
                var refreshTokenExpiry = _tokenService.GetRefreshTokenExpiry();
                await _identityService.UpdateRefreshTokenAsync(user.Id, refreshToken, refreshTokenExpiry);

                return new RefreshTokenResult
                {
                    UserId = user.Id,
                    Token = token,
                    Roles = roles,
                    RefreshToken = refreshToken,
                    RefreshTokenExpiry = refreshTokenExpiry,
                    Success = true,
                    Message = "Token refreshed successfully."
                };
            }
            catch (UnauthorizedException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
