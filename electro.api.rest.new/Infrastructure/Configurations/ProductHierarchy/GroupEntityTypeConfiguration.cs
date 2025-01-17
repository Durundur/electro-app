using Domain.Aggregates.ProductHierarchyAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ProductHierarchy
{
    public class GroupEntityTypeConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.ToTable("Groups");
            builder.HasKey(g => g.Id);
            builder.Property(g => g.Name)
                   .IsRequired()
                   .HasMaxLength(100);
            builder.Property(g => g.Photo)
                   .HasMaxLength(255);
            builder.Property(g => g.Icon)
                   .HasMaxLength(50);
            builder.HasMany(g => g.Attributes)
                .WithOne()
                .HasForeignKey("GroupId")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
