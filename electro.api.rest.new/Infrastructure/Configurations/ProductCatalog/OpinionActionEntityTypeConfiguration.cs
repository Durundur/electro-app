using D = Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Infrastructure.Identity;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class OpinionActionEntityTypeConfiguration : IEntityTypeConfiguration<D.ProductCatalogAggregate.OpinionAction>
    {
        public void Configure(EntityTypeBuilder<D.ProductCatalogAggregate.OpinionAction> builder)
        {
            builder.ToTable("OpinionActions");
            builder.Property<Guid>("Id");
            builder.HasKey("Id");
            builder.HasOne<UserIdentity>().WithMany().HasForeignKey(o => o.UserId);
        }
    }
}
