using MediatR;
using Application.Services.IdentityService;
using Application.Services.UserContext;
using Application.Exceptions;
using Microsoft.Extensions.Logging;

namespace Application.Features.Auth.LogoutUser
{
    public class LogoutUserHandler : IRequestHandler<LogoutUserCommand, bool>
    {
        private readonly IIdentityService _identityService;
        private readonly IUserContext _userContext;
        private readonly ILogger<LogoutUserHandler> _logger;

        public LogoutUserHandler(
            IIdentityService identityService,
            IUserContext userContext,
            ILogger<LogoutUserHandler> logger)
        {
            _identityService = identityService;
            _userContext = userContext;
            _logger = logger;
        }

        public async Task<bool> Handle(LogoutUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                if (!_userContext.IsAuthenticated)
                {
                    throw new UnauthorizedException("User must be authenticated to logout.");
                }

                await _identityService.UpdateRefreshTokenAsync(_userContext.UserId, null, DateTime.MinValue);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while logging out user {UserId}", _userContext.UserId);
                throw new BadRequestException("An error occurred during logout.");
            }
        }
    }
}