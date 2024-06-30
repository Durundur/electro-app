using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Models
{
    public class ApplicationDbContext : IdentityDbContext<UserModel, RoleModel, Guid>
    {
        public DbSet<UserModel> Users {  get; set; }
        public DbSet<AddressModel> Addresses { get; set; }
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<OpinionModel> Opinions { get; set; }
        public DbSet<OpinionActionModel> OpinionsActions { get; set; }
        public DbSet<GroupModel> Groups { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<SubCategoryModel> SubCategories { get; set; }
        public DbSet<ProductSpecificationModel> ProductsSpecification { get; set; }
        public DbSet<CartModel> Carts { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductModel>()
                .OwnsMany(product => product.Features, builder => { builder.ToJson(); })
                .OwnsOne(product => product.Price, builder => { builder.ToJson(); });

            modelBuilder.Entity<ProductSpecificationModel>()
                .OwnsMany(product => product.Specification, builder => { builder.ToJson(); });

            modelBuilder.Entity<CartModel>()
                .OwnsMany(cart => cart.Products);

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
