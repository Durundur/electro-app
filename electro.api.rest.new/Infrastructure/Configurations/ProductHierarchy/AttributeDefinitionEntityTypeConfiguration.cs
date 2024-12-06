using Domain.Aggregates.ProductHierarchyAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductHierarchy
{
    public class AttributeDefinitionEntityTypeConfiguration : IEntityTypeConfiguration<AttributeDefinition>
    {
        public void Configure(EntityTypeBuilder<AttributeDefinition> builder)
        {
            builder.ToTable("AttributeDefinitions");

            builder.HasKey(ad => ad.Id);

            builder.Property(ad => ad.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(ad => ad.Type)
                .IsRequired();
        }
    }
}
