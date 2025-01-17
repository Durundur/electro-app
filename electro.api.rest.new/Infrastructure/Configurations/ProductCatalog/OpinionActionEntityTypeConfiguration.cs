using D = Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class OpinionActionEntityTypeConfiguration : IEntityTypeConfiguration<D.ProductCatalogAggregate.OpinionAction>
    {
        public void Configure(EntityTypeBuilder<D.ProductCatalogAggregate.OpinionAction> builder)
        {
            builder.ToTable("OpinionActions");
            builder.Property<Guid>("Id");
            builder.HasKey("Id");
            builder.HasOne<D.UserProfileAggregate.UserProfile>().WithMany().HasForeignKey(o => o.UserProfileId);
        }
    }
}
