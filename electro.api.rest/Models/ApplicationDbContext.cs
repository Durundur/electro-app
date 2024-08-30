using electro.api.rest.Models.Address;
using electro.api.rest.Models.Address.Address;
using electro.api.rest.Models.Auth;
using electro.api.rest.Models.Cart;
using electro.api.rest.Models.Opinion;
using electro.api.rest.Models.Order;
using electro.api.rest.Models.Order.DeliveryDetails;
using electro.api.rest.Models.Order.OrderItem;
using electro.api.rest.Models.Order.Payment;
using electro.api.rest.Models.Product;
using electro.api.rest.Models.ProductHierarchy;
using electro.api.rest.Models.Recipient;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace electro.api.rest.Models
{
    public class ApplicationDbContext : IdentityDbContext<UserModel, RoleModel, Guid>
    {
        public DbSet<UserModel> Users { get; set; }
        public DbSet<SavedDeliveryAddressModel> SavedDeliveriesAddresses { get; set; }
        public DbSet<SavedOrderRecipientModel> SavedOrdersRecipients { get; set; }
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<OpinionModel> Opinions { get; set; }
        public DbSet<OpinionActionModel> OpinionsActions { get; set; }
        public DbSet<GroupModel> Groups { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<SubCategoryModel> SubCategories { get; set; }
        public DbSet<ProductSpecificationModel> ProductsSpecification { get; set; }
        public DbSet<CartModel> Carts { get; set; }
        public DbSet<OrderModel> Orders { get; set; }
        public DbSet<PaymentDetailsModel> PaymentsDetails { get; set; }
        public DbSet<DeliveryDetailsModel> DeliveriesDetails { get; set; }
        public DbSet<DeliveryAddressModel> DeliveriesAddresses { get; set; }
        public DbSet<OrderRecipientModel> OrdersRecipients { get; set; }
        public DbSet<OrderProductModel> OrdersProducts { get; set; }


        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entries = ChangeTracker.Entries<BaseModel>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductModel>()
                .OwnsMany(product => product.Features, builder => { builder.ToJson(); })
                .OwnsOne(product => product.Price);

            modelBuilder.Entity<ProductSpecificationModel>()
                .OwnsMany(product => product.Specification, builder => { builder.ToJson(); });

            modelBuilder.Entity<OrderProductModel>()
                .OwnsOne(op => op.Price);

            modelBuilder.Entity<CartModel>()
                .OwnsOne(c => c.TotalPrice);

            modelBuilder.Entity<DeliveryDetailsModel>()
                .OwnsOne(dd => dd.Cost);

            modelBuilder.HasSequence<int>("ORDER_NUMBER", schema: "schared")
                .StartsAt(2361)
                .IncrementsBy(1);

            modelBuilder.Entity<OrderModel>()
                .Property(o => o.Number)
                .HasDefaultValueSql("nextval('schared.\"ORDER_NUMBER\"')");


            base.OnModelCreating(modelBuilder);
        }

        public ApplicationDbContext()
        {

        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }


    }
}
