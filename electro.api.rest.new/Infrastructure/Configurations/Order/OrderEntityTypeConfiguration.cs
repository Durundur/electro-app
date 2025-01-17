﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using D = Domain.Aggregates;

namespace Infrastructure.Configurations.Order
{
    public class OrderEntityTypeConfiguration: IEntityTypeConfiguration<D.OrderAggregate.Order>
    {
        public void Configure(EntityTypeBuilder<D.OrderAggregate.Order> builder)
        {
            builder.ToTable("Orders");
            builder.HasOne<D.UserProfileAggregate.UserProfile>().WithMany().HasForeignKey(o => o.UserProfileId);
            builder.HasMany<D.OrderAggregate.OrderProduct>(o => o.Products).WithOne().HasForeignKey(op => op.OrderId);
            builder.Ignore(o => o.TotalPrice);
        }
    }
}
