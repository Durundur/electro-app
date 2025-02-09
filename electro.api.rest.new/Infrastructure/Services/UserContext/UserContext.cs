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

        public Guid UserId
        {
            get
            {
                var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                {
                    throw new InvalidOperationException("User is not authenticated or UserId claim is missing.");
                }

                return userId;
            }
        }

        public string Email
        {
            get
            {
                var emailClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(emailClaim))
                {
                    throw new InvalidOperationException("User is not authenticated or Email claim is missing.");
                }

                return emailClaim;
            }
        }

        public bool IsAdmin
        {
            get
            {
                return _httpContextAccessor.HttpContext?.User.IsInRole("Admin") ?? false;
            }
        }
    }
}
