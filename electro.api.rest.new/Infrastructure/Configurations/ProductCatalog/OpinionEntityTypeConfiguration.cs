using D = Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class OpinionEntityTypeConfiguration : IEntityTypeConfiguration<D.ProductCatalogAggregate.Opinion>
    {
        public void Configure(EntityTypeBuilder<D.ProductCatalogAggregate.Opinion> builder)
        {
            builder.ToTable("ProductOpinions");
            builder.HasKey(o => o.Id);
            builder.HasOne<D.UserProfileAggregate.UserProfile>().WithMany().HasForeignKey(o => o.UserProfileId);
        }
    }
}
