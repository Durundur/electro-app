using Domain.Aggregates.ProductCatalogAggregate;

namespace Application.Reposiotories
{
    public interface IProductRepository
    {
        Task<Product> GetByIdAsync(Guid id);
        Task<IList<Product>> GetProductsByIds(IEnumerable<Guid> productsIds);
        IQueryable<Product> GetProductsQuery();
        Task SaveChangesAsync();
        void AddProduct(Product product);
    }
}
