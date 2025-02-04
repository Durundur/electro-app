using Application.Reposiotories;
using Application.Services.IdentityService;
using Application.Services.TokenService;
using Domain.Aggregates.UserProfileAggregate;
using MediatR;

namespace Application.Features.Auth.RegisterUser
{
    public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, RegisterUserResult>
    {
        private readonly IIdentityService _identityService;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;

        public RegisterUserHandler(IIdentityService identityService, ITokenService tokenService, IUnitOfWork unitOfWork)
        {
            _identityService = identityService;
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;
        }

        public async Task<RegisterUserResult> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            await using var transaction = await _unitOfWork.BeginTransactionAsync(cancellationToken);

            try
            {
                var existingUser = await _identityService.FindUserByEmailAsync(request.Email);
                if (existingUser != null)
                {
                    return new RegisterUserErrorResult("User with this email already exists");
                }

                var user = await _identityService.CreateUserAsync(request.Email, request.Password, new List<string> { "User" });
                if (user == null)
                {
                    return new RegisterUserErrorResult("Failed to create user");
                }

                var userProfile = new UserProfile
                {
                    UserIdentityId = user.Id,
                };

                await _unitOfWork.UserProfileRepository.AddUserProfileAsync(userProfile, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                var roles = await _identityService.GetRolesAsync(user.Id);

                var token = _tokenService.GenerateToken(user, roles);
                var refreshToken = _tokenService.GenerateRefreshToken();
                var refreshTokenExpiry = _tokenService.GetRefreshTokenExpiry();

                await _identityService.UpdateRefreshTokenAsync(user.Id, refreshToken, refreshTokenExpiry);

                await transaction.CommitAsync(cancellationToken);

                return new RegisterUserSuccessResult(userProfile.Id, token, refreshToken, refreshTokenExpiry, roles, "Registration successful");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);

                return new RegisterUserErrorResult("An error occurred during registration, please try again");
            }
        }
    }
}
