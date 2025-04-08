using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using D = Domain.Aggregates;

namespace Infrastructure.Configurations.Order
{
    public class PaymentEntityTypeConfiguration : IEntityTypeConfiguration<D.OrderAggregate.Payment>
    {
        public void Configure(EntityTypeBuilder<D.OrderAggregate.Payment> builder)
        {
            builder.ToTable("OrderPayments");

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

            builder.Property(p => p.Status).HasConversion<string>();

            builder.Property(p => p.Method).HasConversion<string>();

        }
    }
}
