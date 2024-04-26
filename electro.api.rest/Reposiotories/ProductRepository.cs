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

        public ProductModel GetById(Guid id)
        {
            return _dbContext.Products.FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<ProductModel> GetAll()
        {
            return _dbContext.Products.ToList();
        }

        public IEnumerable<ProductModel> GetByGroup(int groupId)
        {
            return _dbContext.Products.Where(p => p.Group.Id == groupId).ToList();
        }

        public void Delete(Guid id)
        {
            var product = _dbContext.Products.FirstOrDefault(p => p.Id == id); ;
            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();
        }

        public ProductModel Update(ProductModel product)
        {
            _dbContext.Products.Update(product);
            _dbContext.SaveChanges();
            return product;
        }

        public ProductModel Add(ProductModel product)
        {
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();
            return product;
        }
    }
}
