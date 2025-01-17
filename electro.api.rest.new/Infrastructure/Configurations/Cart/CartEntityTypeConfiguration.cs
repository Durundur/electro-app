﻿using D = Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.Cart
{
    public class CartEntityTypeConfiguration : IEntityTypeConfiguration<D.CartAggregate.Cart>
    {
        public void Configure(EntityTypeBuilder<D.CartAggregate.Cart> builder)
        {
            builder.ToTable("Carts");
            builder.HasKey(c => c.Id);
            builder.HasMany<D.CartAggregate.CartProduct>(c => c.Products).WithOne().HasForeignKey(c => c.CartId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<D.UserProfileAggregate.UserProfile>().WithOne().HasForeignKey<D.CartAggregate.Cart>(c => c.UserProfileId);
        }
    }
}