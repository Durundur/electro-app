using Application.Reposiotories;
using Application.Services.IdentityService;
using Application.Services.TokenService;
using MediatR;

namespace Application.Features.Auth.LoginUser
{
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, LoginUserResult>
    {
        private readonly IIdentityService _identityService;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;

        public LoginUserHandler(IIdentityService identityService, ITokenService tokenService, IUnitOfWork unitOfWork)
        {
            _identityService = identityService;
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;
        }

        public async Task<LoginUserResult> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _identityService.FindUserByEmailAsync(request.Email);
            
            if (user == null || !await _identityService.CheckPasswordAsync(user.Id, request.Password))
            {
                return new LoginUserErrorResult("Invalid email or password");
            }

            var roles = await _identityService.GetRolesAsync(user.Id);
            var token = _tokenService.GenerateToken(user, roles);
            var refreshToken = _tokenService.GenerateRefreshToken();
            var refreshTokenExpiry = _tokenService.GetRefreshTokenExpiry();

            await _identityService.UpdateRefreshTokenAsync(user.Id, refreshToken, refreshTokenExpiry);
            var userProfile = await _unitOfWork.UserProfileRepository.GetUserProfileByUserIdentityIdAsync(user.Id);

            return new LoginUserSuccessResult(userProfile.Id, token, refreshToken, refreshTokenExpiry, roles.ToList(), "Login successful");
        }
    }
}
