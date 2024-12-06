using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Aggregates.UserProfileAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class OpinionActionEntityTypeConfiguration : IEntityTypeConfiguration<OpinionAction>
    {
        public void Configure(EntityTypeBuilder<OpinionAction> builder)
        {
            builder.ToTable("OpinionActions");

            builder.Property<Guid>("Id");
            builder.HasKey("Id");

            builder.HasOne<UserProfile>().WithMany().HasForeignKey(o => o.UserProfileId);
        }
    }
}
