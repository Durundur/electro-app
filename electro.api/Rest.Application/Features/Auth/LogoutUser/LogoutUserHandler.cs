using MediatR;
using Application.Exceptions;
using Application.Services.AuthService;
using Application.Services.UserContext;

namespace Rest.Application.Features.Auth.LogoutUser
{
    public class LogoutUserHandler : IRequestHandler<LogoutUserCommand, bool>
    {
        private readonly IAuthService _authService;
        private readonly IUserContext _userContext;

        public LogoutUserHandler(IAuthService authService, IUserContext userContext)
        {
            _authService = authService;
            _userContext = userContext;
        }

        public async Task<bool> Handle(LogoutUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                if (!_userContext.IsAuthenticated)
                {
                    throw new UnauthorizedException("User must be authenticated to logout.");
                }

                return await _authService.LogoutUserAsync(_userContext.UserId, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException("An error occurred during logout.", ex);
            }
        }
    }
}