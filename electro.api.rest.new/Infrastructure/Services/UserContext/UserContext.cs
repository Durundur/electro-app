using Application.Exceptions;
using Application.Services.UserContext;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;


namespace Infrastructure.Services.UserContext
{
    public class UserContext : IUserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
        public bool IsAdmin => IsAuthenticated && (_httpContextAccessor.HttpContext?.User.IsInRole("Admin") ?? false);

        public Guid UserId
        {
            get
            {
                if (!IsAuthenticated)
                    throw new UnauthorizedException("User is not authenticated.");

                var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                {
                    throw new UnauthorizedException("UserId claim is missing or invalid.");
                }

                return userId;
            }
        }

        public string Email
        {
            get
            {
                if (!IsAuthenticated)
                    throw new UnauthorizedException("User is not authenticated.");

                var emailClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(emailClaim))
                {
                    throw new UnauthorizedException("Email claim is missing.");
                }

                return emailClaim;
            }
        }
    }
}
