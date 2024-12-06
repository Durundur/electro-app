using Domain.Aggregates.UserProfileAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class UserProfileEntityTypeConfiguration: IEntityTypeConfiguration<UserProfile>
    {
        public void Configure(EntityTypeBuilder<UserProfile> builder)
        {
            builder.HasKey(up => up.Id);

            builder.HasOne<IdentityUser<Guid>>()
               .WithOne()
               .HasForeignKey<UserProfile>(up => up.UserIdentityId);
        }
    }
}
