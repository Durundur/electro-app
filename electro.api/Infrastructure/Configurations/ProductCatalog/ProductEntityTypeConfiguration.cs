using Domain.Aggregates.ProductCatalogAggregate;
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

            builder.Property(p => p.Status).HasConversion<string>();

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

            builder.Ignore(p => p.IsVisible);
            builder.Ignore(p => p.IsAvailableToBuy);
            builder.Ignore(p => p.EffectivePrice);
            builder.Ignore(p => p.MainPhoto);
        }
    }
}
