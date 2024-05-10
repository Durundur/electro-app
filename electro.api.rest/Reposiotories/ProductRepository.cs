using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;

namespace electro.api.rest.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ProductRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ProductModel GetProductById(string id)
        {
            return _dbContext.Products.FirstOrDefault(p => p.Id.ToString().Equals(id));
        }

        public IEnumerable<ProductModel> GetAllProducts()
        {
            return _dbContext.Products.ToList();
        }

        public bool DeleteProduct(string id)
        {
            var product = _dbContext.Products.FirstOrDefault(p => p.Id.ToString().Equals(id));
            if (product == null)
            {
                return false;
            }
            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();
            return true;
        }

        public ProductModel UpdateProduct(ProductModel product)
        {
            _dbContext.Products.Update(product);
            _dbContext.SaveChanges();
            return product;
        }

        public ProductModel CreateProduct(ProductModel product)
        {
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();
            return product;
        }
    }
}
