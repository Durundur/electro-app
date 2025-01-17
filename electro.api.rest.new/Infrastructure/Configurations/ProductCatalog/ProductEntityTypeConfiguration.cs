using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Aggregates.ProductHierarchyAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.GroupId).IsRequired(false);
            builder.Property(p => p.CategoryId).IsRequired(false);
            builder.Property(p => p.SubCategoryId).IsRequired(false);
            builder.Property(p => p.Photos)
                .HasColumnType("text[]")
                .HasConversion(
                    photos => photos.ToArray(),
                    array => array.ToList()
                );
            builder.OwnsOne(p => p.Price, priceBuilder =>
            {
                priceBuilder.Property(m => m.Amount)
                    .HasColumnName("Amount")
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                priceBuilder.Property(m => m.Currency)
                    .HasColumnName("Currency")
                    .HasConversion<string>()
                    .HasMaxLength(3)
                    .IsRequired();
            });
            builder.HasOne<Group>().WithMany().HasForeignKey(p => p.GroupId);
            builder.HasOne<Category>().WithMany().HasForeignKey(p => p.CategoryId);
            builder.HasOne<SubCategory>().WithMany().HasForeignKey(p => p.SubCategoryId);
        }
    }
}
