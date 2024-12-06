using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Aggregates.UserProfileAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class OpinionEntityTypeConfiguration : IEntityTypeConfiguration<Opinion>
    {
        public void Configure(EntityTypeBuilder<Opinion> builder)
        {
            builder.ToTable("ProductOpinions");

            builder.HasKey(o => o.Id);

            builder.HasOne<UserProfile>().WithMany().HasForeignKey(o => o.UserProfileId);
        }
    }
}
