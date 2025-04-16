using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using D = Domain.Aggregates;

namespace Infrastructure.Configurations.Order
{
    public class OrderProductEntityTypeConfiguration: IEntityTypeConfiguration<D.OrderAggregate.OrderProduct>
    {
        public void Configure(EntityTypeBuilder<D.OrderAggregate.OrderProduct> builder)
        {
            builder.ToTable("OrderProducts");

            builder.HasKey(op => op.Id);

            builder.HasOne<D.ProductCatalogAggregate.Product>(op => op.Product).WithMany().HasForeignKey("ProductId");

            builder.OwnsOne(c => c.Price, priceBuilder =>
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
            builder.Ignore(op => op.TotalPrice);
        }
    }
}
