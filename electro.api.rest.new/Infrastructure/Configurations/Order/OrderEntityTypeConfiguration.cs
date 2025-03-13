using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using D = Domain.Aggregates;

namespace Infrastructure.Configurations.Order
{
    public class OrderEntityTypeConfiguration: IEntityTypeConfiguration<D.OrderAggregate.Order>
    {
        public void Configure(EntityTypeBuilder<D.OrderAggregate.Order> builder)
        {
            builder.ToTable("Orders");
            builder.HasOne<UserIdentity>().WithMany().HasForeignKey(o => o.UserId);
            builder.HasMany<D.OrderAggregate.OrderProduct>(o => o.Products).WithOne();
            builder.Ignore(o => o.TotalPrice);
            builder.Property(o => o.Number).ValueGeneratedOnAdd();
        }
    }
}
