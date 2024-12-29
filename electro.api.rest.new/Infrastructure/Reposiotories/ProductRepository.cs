using Application.Reposiotories;
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

        public void AddProduct(Product product)
        {
            _context.Products.Add(product);
        }

        public async Task<Product> GetByIdAsync(Guid id)
        {
            var product = await _context.Products
                .Include(p => p.Attributes)
                .FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }

        public async Task<IList<Product>> GetProductsByIds(IEnumerable<Guid> productsIds)
        {
            var products = await _context.Products.Where(p => productsIds.Contains(p.Id)).ToListAsync();
            return products;
        }

        public IQueryable<Product> GetProductsQuery()
        {
            return _context.Products.AsQueryable();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
