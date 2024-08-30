using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Reposiotories
{
    public class UnitOfWork: IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext context;
        public IProductHierarchyRepository ProductHierarchy { get; private set; }
        public IProductRepository Products { get; private set; }
        public IOpinionRepository Opinions { get; private set; }
        public ICartRepository Carts { get; private set; }
        public IOrderRepository Orders { get; private set; }

        public UnitOfWork(ApplicationDbContext context, IProductHierarchyRepository productHierarchyRepository, 
            IProductRepository productRepository, IOpinionRepository opinionRepository, ICartRepository cartRepository,
            IOrderRepository orderRepository)
        {
            this.context = context;
            ProductHierarchy = productHierarchyRepository;
            Products = productRepository;
            Opinions = opinionRepository;
            Carts = cartRepository;
            Orders = orderRepository;
        }

        public async Task<int> CompleteAsync()
        {
            UpdateTimestamps();
            return await context.SaveChangesAsync();
        }

        private void UpdateTimestamps()
        {
            var entries = context.ChangeTracker.Entries<BaseModel>();

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

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
