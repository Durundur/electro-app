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

        public async Task<IList<Product>> GetProductsByIdsAsync(IEnumerable<Guid> productsIds, CancellationToken cancellationToken)
        {
            var products = await _context.Products.Where(p => productsIds.Contains(p.Id)).ToListAsync();
            return products;
        }

        public IQueryable<Product> GetProductsQuery()
        {
            return _context.Products.AsQueryable();
        }
    }
}
