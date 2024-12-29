using Domain.Aggregates.CartAggregate;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Aggregates.ProductHierarchyAggregate;
using Domain.Aggregates.UserProfileAggregate;
using Infrastructure.Configurations;
using Infrastructure.Configurations.Cart;
using Infrastructure.Configurations.ProductCatalog;
using Infrastructure.Configurations.ProductHierarchy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser<Guid>, IdentityRole<Guid>, Guid>
    {
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<AttributeDefinition> AttributesDefinitions { get; set; }
        public DbSet<Cart> Carts { get; set; }

        public ApplicationDbContext()
        {

        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new UserProfileEntityTypeConfiguration());

            builder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            builder.ApplyConfiguration(new OpinionEntityTypeConfiguration());
            builder.ApplyConfiguration(new OpinionActionEntityTypeConfiguration());
            builder.ApplyConfiguration(new AttributeValueEntityTypeConfiguration());

            builder.ApplyConfiguration(new GroupEntityTypeConfiguration());
            builder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            builder.ApplyConfiguration(new SubCategoryEntityTypeConfiguration());
            builder.ApplyConfiguration(new AttributeDefinitionEntityTypeConfiguration());

            builder.ApplyConfiguration(new CartEntityTypeConfiguration());
            builder.ApplyConfiguration(new CartProductEntityTypeConfiguration());

            base.OnModelCreating(builder);
        }

    }
}
