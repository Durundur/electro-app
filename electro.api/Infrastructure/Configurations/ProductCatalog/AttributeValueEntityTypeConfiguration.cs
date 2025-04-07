﻿using Domain.Aggregates.ProductCatalogAggregate;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class AttributeValueEntityTypeConfiguration : IEntityTypeConfiguration<AttributeValue>
    {
        public void Configure(EntityTypeBuilder<AttributeValue> builder)
        {
            builder.ToTable("ProductAttributes");

            builder.Property(pa => pa.Value)
                .IsRequired()
                .HasMaxLength(255);

            builder.HasKey(["AttributeDefinitionId", "ProductId"]);
        }
    }
}
