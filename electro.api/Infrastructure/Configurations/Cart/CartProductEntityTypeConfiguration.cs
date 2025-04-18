﻿using D = Domain.Aggregates.CartAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Aggregates.ProductCatalogAggregate;

namespace Infrastructure.Configurations.Cart
{
    public class CartProductEntityTypeConfiguration : IEntityTypeConfiguration<D.CartProduct>
    {
        public void Configure(EntityTypeBuilder<D.CartProduct> builder)
        {
            builder.ToTable("CartProducts");

            builder.HasKey(c => c.Id);

            builder.OwnsOne(c => c.UnitPrice, priceBuilder =>
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

            builder.HasOne<Product>(c => c.Product).WithMany().HasForeignKey("ProductId");
        }
    }
}
