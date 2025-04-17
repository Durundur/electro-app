using Application.Exceptions;
using Application.Services.IdentityServices;
using Application.Services.Models;
using Application.Services.TokenService;
using Domain.Reposiotories;
using System.Security.Claims;
using System.Threading;

namespace Application.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IIdentityService _identityService;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;

        public AuthService(IIdentityService identityService, ITokenService tokenService, IUnitOfWork unitOfWork)
        {
            _identityService = identityService;
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;
        }


        public async Task<LoginUserResult> LoginUserAsync(string email, string password, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _identityService.FindUserByEmailAsync(email);
                if (user == null)
                {
                    return new LoginUserErrorResult("Invalid email or password");
                }

                if (!await _identityService.CheckPasswordAsync(user.Id, password))
                {
                    return new LoginUserErrorResult("Invalid email or password");
                }

                var roles = await _identityService.GetRolesAsync(user.Id);

                var (token, tokenExpiry) = _tokenService.GenerateToken(user, roles);
                var (refreshToken, refreshTokenExpiry) = _tokenService.GenerateRefreshToken();

                await _identityService.UpdateRefreshTokenAsync(user.Id, refreshToken, refreshTokenExpiry);

                return new LoginUserSuccessResult(user.Id, token, tokenExpiry, refreshToken, refreshTokenExpiry, roles, "Login successful");
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> LogoutUserAsync(Guid userId, CancellationToken cancellationToken)
        {
            await _identityService.UpdateRefreshTokenAsync(userId, null, DateTime.MinValue);

            return true;
        }

        public async Task<RefreshTokenResult> RefreshTokenAsync(string refreshToken, string token, CancellationToken cancellationToken)
        {
            try
            {
                var principal = _tokenService.GetTokenPrincipal(token);
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
                    user.RefreshToken != refreshToken ||
                    !user.RefreshTokenExpiry.HasValue ||
                    user.RefreshTokenExpiry.Value <= DateTime.UtcNow)
                {
                    throw new UnauthorizedException("Invalid or expired refresh token");
                }

                var roles = await _identityService.GetRolesAsync(user.Id);
                var (newToken, tokenExpiry) = _tokenService.GenerateToken(user, roles);
                var (newRefreshToken, refreshTokenExpiry) = _tokenService.GenerateRefreshToken();

                await _identityService.UpdateRefreshTokenAsync(user.Id, refreshToken, refreshTokenExpiry);

                return new RefreshTokenSuccessResult(user.Id, token, tokenExpiry, refreshToken, refreshTokenExpiry, roles, "Token refreshed successfully.");
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<RegisterUserResult> RegisterUserAsync(string email, string password, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync(cancellationToken: cancellationToken);

                var existingUser = await _identityService.FindUserByEmailAsync(email);
                if (existingUser != null)
                {
                    return new RegisterUserErrorResult("User with this email already exists.");
                }

                var user = await _identityService.CreateUserAsync(email, password, new List<string> { "User" });
                if (user == null)
                {
                    return new RegisterUserErrorResult("Failed to create user.");
                }

                var roles = await _identityService.GetRolesAsync(user.Id);

                var (token, tokenExpiry) = _tokenService.GenerateToken(user, roles);
                var (refreshToken, refreshTokenExpiry) = _tokenService.GenerateRefreshToken();

                await _identityService.UpdateRefreshTokenAsync(user.Id, refreshToken, refreshTokenExpiry);

                await _unitOfWork.CommitTransactionAsync(cancellationToken);

                return new RegisterUserSuccessResult(user.Id, token, tokenExpiry, refreshToken, refreshTokenExpiry, roles, "Registration successful.");
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync(cancellationToken);
                throw;
            }
        }
    }
}
