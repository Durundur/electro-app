using Domain.Aggregates.UserAggregate;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class UserIdentity : IdentityUser<Guid>, IUser
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
    }
}
