using Domain.Reposiotories;
using Domain.Aggregates.ProductCatalogAggregate;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Reposiotories
{
    public class ProductRepository : IProductRepository
    {
        protected readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> AddProductAsync(Product product, CancellationToken cancellationToken)
        {
            var entry = await _context.Products.AddAsync(product);
            return entry.Entity;
        }

        public async Task<Product> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var product = await _context.Products
                .Include(p => p.Attributes)
                .Include(p => p.Opinions)
                .FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }

        public async Task<Product> GetByIdWithLockAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Products
                .FromSqlInterpolated($@"SELECT * FROM ""Products"" WHERE ""Id"" = {id} FOR UPDATE")
                .Include(p => p.Attributes)
                .Include(p => p.Opinions)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<IList<Product>> GetProductsByIdsAsync(IEnumerable<Guid> productIds, CancellationToken cancellationToken)
        {
            var products = await _context.Products.Where(p => productIds.Contains(p.Id)).ToListAsync();
            return products;
        }

        public async Task<IList<Product>> GetProductsByIdsWithLockAsync(IEnumerable<Guid> productIds, CancellationToken cancellationToken = default)
        {
            var parameterList = string.Join(",", productIds.Select(id => $"'{id}'::uuid"));

            return await _context.Products
                .FromSqlRaw($@"
                    SELECT * FROM ""Products"" 
                    WHERE ""Id"" IN ({parameterList})
                    ORDER BY ""Id"" 
                    FOR UPDATE")
                .ToListAsync(cancellationToken);
        }

        public IQueryable<Product> GetProductsQuery()
        {
            return _context.Products.AsQueryable();
        }
    }
}
