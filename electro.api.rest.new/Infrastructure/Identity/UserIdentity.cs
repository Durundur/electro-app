using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class UserIdentity : IdentityUser<Guid>
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
    }
}
