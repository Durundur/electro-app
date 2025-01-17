using Domain.Aggregates.CartAggregate;
using Domain.Aggregates.OrderAggregate;
using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Aggregates.ProductHierarchyAggregate;
using Domain.Aggregates.UserProfileAggregate;
using Infrastructure.Configurations.Cart;
using Infrastructure.Configurations.Order;
using Infrastructure.Configurations.ProductCatalog;
using Infrastructure.Configurations.ProductHierarchy;
using Infrastructure.Configurations.UserProfile;
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
        public DbSet<Domain.Aggregates.UserProfileAggregate.Recipient> Recipients { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Domain.Aggregates.OrderAggregate.Recipient> OrderRecipients { get; set; }
        public DbSet<Payment> OrderPayments { get; set; }
        public DbSet<Delivery> OrderDeliveries { get; set; }


        public ApplicationDbContext()
        {

        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new UserProfileEntityTypeConfiguration());
            builder.ApplyConfiguration(new Configurations.UserProfile.RecipientEntityTypeConfiguration());

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

            builder.ApplyConfiguration(new OrderEntityTypeConfiguration());
            builder.ApplyConfiguration(new OrderProductEntityTypeConfiguration());
            builder.ApplyConfiguration(new DeliveryEntityTypeConfiguration());
            builder.ApplyConfiguration(new PaymentEntityTypeConfiguration());
            builder.ApplyConfiguration(new Configurations.Order.RecipientEntityTypeConfiguration());

            base.OnModelCreating(builder);
        }

    }
}
