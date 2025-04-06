using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Infrastructure.Identity;

namespace Infrastructure.Configurations.UserProfile
{
    public class UserIdentityEntityTypeConfiguration : IEntityTypeConfiguration<UserIdentity>
    {
        public void Configure(EntityTypeBuilder<UserIdentity> builder)
        {
            builder.HasKey(ui => ui.Id);
        }
    }
}
