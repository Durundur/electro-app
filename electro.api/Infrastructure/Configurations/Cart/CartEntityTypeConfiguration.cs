using D = Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Infrastructure.Identity;

namespace Infrastructure.Configurations.Cart
{
    public class CartEntityTypeConfiguration : IEntityTypeConfiguration<D.CartAggregate.Cart>
    {
        public void Configure(EntityTypeBuilder<D.CartAggregate.Cart> builder)
        {
            builder.ToTable("Carts");
            builder.HasKey(c => c.Id);
            builder.HasIndex(c => c.Id).IsUnique();
            builder.HasMany<D.CartAggregate.CartProduct>(c => c.Products).WithOne();
            builder.HasOne<UserIdentity>().WithOne().HasForeignKey<D.CartAggregate.Cart>(c => c.UserId);
        }
    }
}
