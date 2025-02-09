using Domain.Aggregates.ProductCatalogAggregate;

namespace Domain.Reposiotories
{
    public interface IProductRepository
    {
        Task<Product> GetByIdAsync(Guid id);
        Task<IList<Product>> GetProductsByIdsAsync(IEnumerable<Guid> productsIds);
        IQueryable<Product> GetProductsQuery();
        void AddProduct(Product product);
    }
}
