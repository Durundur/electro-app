using D = Domain.Aggregates.UserProfileAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.UserProfile
{
    public class RecipientEntityTypeConfiguration : IEntityTypeConfiguration<D.Recipient>
    {
        public void Configure(EntityTypeBuilder<D.Recipient> builder)
        {
            builder.ToTable("Recipients");
            builder.HasOne<D.UserProfile>().WithMany().HasForeignKey(r => r.UserProfileId);
        }
    }
}
