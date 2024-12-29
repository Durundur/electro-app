using D = Domain.Aggregates.CartAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Aggregates.CartAggregate;
using Domain.Aggregates.UserProfileAggregate;

namespace Infrastructure.Configurations.Cart
{
    public class CartEntityTypeConfiguration : IEntityTypeConfiguration<D.Cart>
    {
        public void Configure(EntityTypeBuilder<D.Cart> builder)
        {
            builder.ToTable("Carts");
            builder.HasKey(c => c.Id);
            builder.HasMany<CartProduct>(c => c.Products).WithOne().HasForeignKey(c => c.CartId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<UserProfile>().WithOne().HasForeignKey<D.Cart>(c => c.UserProfileId);
        }
    }
}
