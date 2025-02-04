using Application.Models.Identity;
using Application.Reposiotories;
using Application.Services.IdentityService;
using Application.Services.TokenService;
using MediatR;
using System.Security.Claims;

namespace Application.Features.Auth.RefreshToken
{
    public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenResult>
    {
        private readonly IIdentityService _identityService;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;

        public RefreshTokenHandler(IIdentityService identityService, ITokenService tokenService, IUnitOfWork unitOfWork)
        {
            _identityService = identityService;
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;
        }

        public async Task<RefreshTokenResult> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var principal = _tokenService.GetTokenPrincipal(request.Token);
            if (principal == null)
            {
                throw new UnauthorizedAccessException("Invalid JWT token.");
            }

            var userId = principal.FindFirst(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("Invalid JWT token.");
            }

            var userIdentity = await _identityService.FindUserByIdAsync(new Guid(userId.Value));
            if (userIdentity == null)
            {
                throw new InvalidOperationException(nameof(UserIdentity));
            }

            if (userIdentity.RefreshToken != request.RefreshToken || userIdentity.RefreshTokenExpiry < DateTime.UtcNow)
            {
                throw new UnauthorizedAccessException("Invalid or expired refresh token.");
            }

            var roles = await _identityService.GetRolesAsync(userIdentity.Id);
            var token = _tokenService.GenerateToken(userIdentity, roles);
            var refreshToken = _tokenService.GenerateRefreshToken();
            var refreshTokenExpiry = _tokenService.GetRefreshTokenExpiry();
            await _identityService.UpdateRefreshTokenAsync(userIdentity.Id, refreshToken, refreshTokenExpiry);
            var userProfile = await _unitOfWork.UserProfileRepository.GetUserProfileByUserIdentityIdAsync(userIdentity.Id);

            return new RefreshTokenResult
            {
                UserProfileId = userProfile.Id,
                Token = token,
                Roles = roles,
                RefreshToken = refreshToken,
                RefreshTokenExpiry = refreshTokenExpiry,
                Success = true,
                Message = "Token refreshed successfully."
            };
        }
    }
}
