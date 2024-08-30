using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace electro.api.rest.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetAuthenticatedUserId(this ClaimsPrincipal User)
        {
            if (User.Identity.IsAuthenticated)
            {
                var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (Guid.TryParse(userIdString, out var userId))
                {
                    return userId;
                }
            }
            return Guid.Empty;
        }
    }
}
