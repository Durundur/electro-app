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
                .Include(p => p.Promotion)
                .FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }

        public async Task<Product> GetByIdWithLockAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var product = await _context.Products
                .FromSqlInterpolated($@"SELECT * FROM ""Products"" WHERE ""Id"" = {id} FOR UPDATE")
                .AsTracking()
                .FirstOrDefaultAsync(cancellationToken);

            if (product == null)
            {
                return null;
            }
                
            await _context.Entry(product).Collection(p => p.Attributes).LoadAsync(cancellationToken);
            await _context.Entry(product).Collection(p => p.Opinions).LoadAsync(cancellationToken);
            await _context.Entry(product).Reference(p => p.Promotion).LoadAsync(cancellationToken);

            return product;
        }

        public async Task<IList<Product>> GetProductsByIdsAsync(IEnumerable<Guid> productIds, CancellationToken cancellationToken)
        {
            var products = await _context.Products
                .Where(p => productIds.Contains(p.Id))
                .Include(p => p.Attributes)
                .Include(p => p.Opinions)
                .Include(p => p.Promotion)
                .ToListAsync();
            return products;
        }

        public async Task<IList<Product>> GetProductsByIdsWithLockAsync(IEnumerable<Guid> productIds, CancellationToken cancellationToken = default)
        {
            var parameterList = string.Join(",", productIds.Select(id => $"'{id}'::uuid"));

            var products = await _context.Products
                .FromSqlRaw($@"
                    SELECT * FROM ""Products"" 
                    WHERE ""Id"" IN ({parameterList})
                    ORDER BY ""Id"" 
                    FOR UPDATE")
                .AsTracking()
                .ToListAsync(cancellationToken);

            if (!products.Any())
            {
                return new List<Product>();
            }

            foreach (var product in products)
            {
                await _context.Entry(product).Collection(p => p.Attributes).LoadAsync(cancellationToken);
                await _context.Entry(product).Collection(p => p.Opinions).LoadAsync(cancellationToken);
                await _context.Entry(product).Reference(p => p.Promotion).LoadAsync(cancellationToken);
            }

            return products;
        }

        public IQueryable<Product> GetProductsQuery()
        {
            return _context.Products.AsQueryable();
        }
    }
}
