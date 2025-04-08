using D = Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Infrastructure.Identity;

namespace Infrastructure.Configurations.ProductCatalog
{
    public class OpinionReactionEntityTypeConfiguration : IEntityTypeConfiguration<D.ProductCatalogAggregate.OpinionReaction>
    {
        public void Configure(EntityTypeBuilder<D.ProductCatalogAggregate.OpinionReaction> builder)
        {
            builder.ToTable("ProductOpinionReactions");

            builder.HasKey(r => new { r.UserId, r.OpinionId });

            builder.HasOne<D.ProductCatalogAggregate.Opinion>().WithMany(o => o.Reactions).HasForeignKey(r => r.OpinionId).OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<UserIdentity>().WithMany().HasForeignKey(o => o.UserId).OnDelete(DeleteBehavior.NoAction);

            builder.Property(o => o.Reaction).HasConversion<string>();
        }
    }
}
