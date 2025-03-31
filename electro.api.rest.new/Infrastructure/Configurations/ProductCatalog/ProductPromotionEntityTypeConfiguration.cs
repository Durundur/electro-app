using Domain.Aggregates.ProductCatalogAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class ProductPromotionEntityTypeConfiguration : IEntityTypeConfiguration<ProductPromotion>
    {
        public void Configure(EntityTypeBuilder<ProductPromotion> builder)
        {
            builder.ToTable("ProductPromotions");
            builder.HasKey(p => p.Id);

            builder.OwnsOne(p => p.PromotionalPrice, priceBuilder =>
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

            builder.HasOne<Product>()
                .WithOne(p => p.Promotion)
                .HasForeignKey<ProductPromotion>(p => p.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
