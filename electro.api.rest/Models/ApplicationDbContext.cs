using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Models
{
    public class ApplicationDbContext : IdentityDbContext<UserModel, IdentityRole<Guid>, Guid>
    {
        public DbSet<UserModel> Users {  get; set; }
        public DbSet<AddressModel> Addresses { get; set; }
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<OpinionModel> Opinions { get; set; }
        public DbSet<GroupModel> Groups { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<SubCategoryModel> SubCategories { get; set; }
        public DbSet<ProductSpecificationModel> ProductsSpecification { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductModel>()
                .OwnsOne(product => product.Price, builder => { builder.ToJson(); });
            base.OnModelCreating(modelBuilder);
        }

    }
}
