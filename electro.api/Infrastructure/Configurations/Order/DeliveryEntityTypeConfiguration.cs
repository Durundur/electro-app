using D = Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.Order
{
    public class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<D.OrderAggregate.Delivery>
    {
        public void Configure(EntityTypeBuilder<D.OrderAggregate.Delivery> builder)
        {
            builder.ToTable("OrderDeliveries");
            builder.OwnsOne(c => c.Cost, priceBuilder =>
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
            builder.Property<Guid>("Id");
            builder.HasKey("Id");
        }
    }
}
