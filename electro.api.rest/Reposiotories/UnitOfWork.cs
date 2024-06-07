using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using electro.api.rest.Repositories;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Reposiotories
{
    public class UnitOfWork: IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext _context;
        public IGroupRepository Groups { get; private set; }
        public IProductRepository Products { get; private set; }
        public IOpinionRepository Opinions { get; private set; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Groups = new GroupRepository(_context);
            Products = new ProductRepository(_context, this);
            Opinions = new OpinionRepository(_context);
        }

        public async Task CompleteAsync()
        {
            UpdateTimestamps();
            await _context.SaveChangesAsync();
        }

        private void UpdateTimestamps()
        {
            var entries = _context.ChangeTracker.Entries<BaseModel>();

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
            _context.Dispose();
        }
    }
}
