using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IProductRepository
    {
        Task<ProductModel> CreateProduct(ProductModel product);
        Task DeleteProduct(string id);
        Task<ProductModel> GetProductById(string id);
        IQueryable<ProductModel> GetProducts();
        Task<ProductModel> UpdateProduct(ProductModel product);
    }
}