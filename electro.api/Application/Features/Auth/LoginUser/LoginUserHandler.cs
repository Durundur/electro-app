using Application.Services.IdentityService;
using Application.Services.TokenService;
using Microsoft.Extensions.Logging;
using MediatR;

namespace Application.Features.Auth.LoginUser
{
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, LoginUserResult>
    {
        private readonly IIdentityService _identityService;
        private readonly ITokenService _tokenService;
        private readonly ILogger<LoginUserHandler> _logger;

        public LoginUserHandler(IIdentityService identityService, ITokenService tokenService, ILogger<LoginUserHandler> logger)
        {
            _identityService = identityService;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task<LoginUserResult> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return new LoginUserErrorResult("Email and password are required");
            }

            try
            {
                var user = await _identityService.FindUserByEmailAsync(request.Email);
                if (user == null)
                {
                    return new LoginUserErrorResult("Invalid email or password");
                }

                if (!await _identityService.CheckPasswordAsync(user.Id, request.Password))
                {
                    return new LoginUserErrorResult("Invalid email or password");
                }

                var roles = await _identityService.GetRolesAsync(user.Id);

                var (token, tokenExpiry) = _tokenService.GenerateToken(user, roles);
                var (refreshToken, refreshTokenExpiry) = _tokenService.GenerateRefreshToken();

                await _identityService.UpdateRefreshTokenAsync(user.Id, refreshToken, refreshTokenExpiry);

                return new LoginUserSuccessResult(
                    user.Id,
                    token,
                    tokenExpiry,
                    refreshToken,
                    refreshTokenExpiry,
                    roles,
                    "Login successful");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during login");
                return new LoginUserErrorResult("An error occurred during login. Please try again");
            }
        }
    }
}
