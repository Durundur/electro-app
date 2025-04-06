using Domain.Aggregates.ProductHierarchyAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductHierarchy
{
    public class SubCategoryEntityTypeConfiguration : IEntityTypeConfiguration<SubCategory>
    {
        public void Configure(EntityTypeBuilder<SubCategory> builder)
        {
            builder.ToTable("SubCategories");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityAlwaysColumn();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasMany(g => g.Attributes)
                .WithOne()
                .HasForeignKey("SubCategoryId")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
