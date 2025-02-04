using D = Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Infrastructure.Identity;

namespace Infrastructure.Configurations.UserProfile
{
    public class UserProfileEntityTypeConfiguration : IEntityTypeConfiguration<D.UserProfileAggregate.UserProfile>
    {
        public void Configure(EntityTypeBuilder<D.UserProfileAggregate.UserProfile> builder)
        {
            builder.HasKey(up => up.Id);
            builder.HasOne<UserIdentity>()
               .WithOne()
               .HasForeignKey<D.UserProfileAggregate.UserProfile>(up => up.UserIdentityId);
        }
    }
}
