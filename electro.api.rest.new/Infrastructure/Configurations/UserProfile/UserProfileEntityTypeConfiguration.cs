using D = Domain.Aggregates;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.UserProfile
{
    public class UserProfileEntityTypeConfiguration : IEntityTypeConfiguration<D.UserProfileAggregate.UserProfile>
    {
        public void Configure(EntityTypeBuilder<D.UserProfileAggregate.UserProfile> builder)
        {
            builder.HasKey(up => up.Id);
            builder.HasOne<IdentityUser<Guid>>()
               .WithOne()
               .HasForeignKey<D.UserProfileAggregate.UserProfile>(up => up.UserIdentityId);
        }
    }
}
