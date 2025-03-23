using Domain.Reposiotories;
using Application.Services.IdentityService;
using Application.Services.TokenService;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.Auth.RegisterUser
{
    public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, RegisterUserResult>
    {
        private readonly IIdentityService _identityService;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<RegisterUserHandler> _logger;

        public RegisterUserHandler(IIdentityService identityService, ITokenService tokenService, IUnitOfWork unitOfWork, ILogger<RegisterUserHandler> logger)
        {
            _identityService = identityService;
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<RegisterUserResult> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.BeginTransactionAsync(cancellationToken);

            try
            {
                var existingUser = await _identityService.FindUserByEmailAsync(request.Email);
                if (existingUser != null)
                {
                    return new RegisterUserErrorResult("User with this email already exists.");
                }

                var user = await _identityService.CreateUserAsync(request.Email, request.Password, new List<string> { "User" });
                if (user == null)
                {
                    return new RegisterUserErrorResult("Failed to create user.");
                }

                var roles = await _identityService.GetRolesAsync(user.Id);

                var (token, tokenExpiry) = _tokenService.GenerateToken(user, roles);
                var (refreshToken, refreshTokenExpiry) = _tokenService.GenerateRefreshToken();

                await _identityService.UpdateRefreshTokenAsync(user.Id, refreshToken, refreshTokenExpiry);

                await _unitOfWork.CommitTransactionAsync(cancellationToken);

                return new RegisterUserSuccessResult(
                    user.Id,
                    token,
                    tokenExpiry,
                    refreshToken,
                    refreshTokenExpiry,
                    roles,
                    "Registration successful.");
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync(cancellationToken);
                _logger.LogError(ex, "An error occurred during registration.");
                return new RegisterUserErrorResult($"An error occurred during registration: {ex.Message}");
            }
        }
    }
}
