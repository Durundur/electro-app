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

        public async Task<Product> AddProductAsync(Product product, CancellationToken cancellationToken = default)
        {
            var entry = await _context.Products.AddAsync(product);
            return entry.Entity;
        }

        public async Task<Product> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var product = await this.GetProductsQuery()
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

            await _context.Entry(product).Reference(p => p.Group).LoadAsync(cancellationToken);
            await _context.Entry(product).Reference(p => p.Category).LoadAsync(cancellationToken);
            await _context.Entry(product).Reference(p => p.SubCategory).LoadAsync(cancellationToken);
            await _context.Entry(product).Collection(p => p.Attributes).LoadAsync(cancellationToken);

            foreach (var attribute in product.Attributes)
            {
                await _context.Entry(attribute).Reference(a => a.AttributeDefinition).LoadAsync(cancellationToken);
            }

            await _context.Entry(product).Collection(p => p.Opinions).LoadAsync(cancellationToken);

            foreach (var opinion in product.Opinions)
            {
                await _context.Entry(opinion).Collection(o => o.Reactions).LoadAsync(cancellationToken);
            }

            await _context.Entry(product).Reference(p => p.Promotion).LoadAsync(cancellationToken);

            return product;
        }

        public async Task<IList<Product>> GetProductsByIdsAsync(IEnumerable<Guid> productIds, CancellationToken cancellationToken = default)
        {
            var products = await this.GetProductsQuery()
                .Where(p => productIds.Contains(p.Id))
                .ToListAsync(cancellationToken);

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
                await _context.Entry(product).Reference(p => p.Group).LoadAsync(cancellationToken);
                await _context.Entry(product).Reference(p => p.Category).LoadAsync(cancellationToken);
                await _context.Entry(product).Reference(p => p.SubCategory).LoadAsync(cancellationToken);
                await _context.Entry(product).Collection(p => p.Attributes).LoadAsync(cancellationToken);

                foreach (var attribute in product.Attributes)
                {
                    await _context.Entry(attribute).Reference(a => a.AttributeDefinition).LoadAsync(cancellationToken);
                }

                await _context.Entry(product).Collection(p => p.Opinions).LoadAsync(cancellationToken);

                foreach (var opinion in product.Opinions)
                {
                    await _context.Entry(opinion).Collection(o => o.Reactions).LoadAsync(cancellationToken);
                }

                await _context.Entry(product).Reference(p => p.Promotion).LoadAsync(cancellationToken);
            }

            return products;
        }

        public IQueryable<Product> GetProductsQuery(CancellationToken cancellationToken = default)
        {
            return _context.Products
                .Include(p => p.Group)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .Include(p => p.Attributes)
                    .ThenInclude(pa => pa.AttributeDefinition)
                .Include(p => p.Opinions)
                    .ThenInclude(po => po.Reactions)
                .Include(p => p.Promotion)
                .AsQueryable();
        }
    }
}
