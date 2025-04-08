using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using D = Domain.Aggregates;

namespace Infrastructure.Configurations.Order
{

    public class RecipientEntityTypeConfiguration : IEntityTypeConfiguration<D.OrderAggregate.Recipient>
    {
        public void Configure(EntityTypeBuilder<D.OrderAggregate.Recipient> builder)
        {
            builder.ToTable("OrderRecipients");

            builder.Property<Guid>("Id");

            builder.HasKey("Id");

            builder.Property(r => r.Type).HasConversion<string>();
        }
    }
}
