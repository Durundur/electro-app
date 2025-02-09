using D = Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Infrastructure.Identity;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class OpinionEntityTypeConfiguration : IEntityTypeConfiguration<D.ProductCatalogAggregate.Opinion>
    {
        public void Configure(EntityTypeBuilder<D.ProductCatalogAggregate.Opinion> builder)
        {
            builder.ToTable("ProductOpinions");
            builder.HasKey(o => o.Id);
            builder.HasOne<UserIdentity>().WithMany().HasForeignKey(o => o.UserId);
        }
    }
}
