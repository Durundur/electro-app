using D = Domain.Aggregates.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Infrastructure.Identity;

namespace Infrastructure.Configurations.UserProfile
{
    public class RecipientEntityTypeConfiguration : IEntityTypeConfiguration<D.Recipient>
    {
        public void Configure(EntityTypeBuilder<D.Recipient> builder)
        {
            builder.ToTable("Recipients");

            builder.HasOne<UserIdentity>().WithMany().HasForeignKey(r => r.UserId);

            builder.Property(r => r.Type).HasConversion<string>();
        }
    }
}
