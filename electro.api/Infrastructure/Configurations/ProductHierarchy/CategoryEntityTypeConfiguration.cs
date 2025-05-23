﻿using Domain.Aggregates.ProductHierarchyAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductHierarchy
{
    public class CategoryEntityTypeConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Categories");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                   .IsRequired()
                   .HasMaxLength(100);
                   
            builder.HasMany(g => g.Attributes)
                .WithOne()
                .HasForeignKey("CategoryId")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
