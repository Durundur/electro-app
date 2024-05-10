using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IProductRepository
    {
        ProductModel CreateProduct(ProductModel product);
        bool DeleteProduct(string id);
        IEnumerable<ProductModel> GetAllProducts();
        ProductModel GetProductById(string id);
        ProductModel UpdateProduct(ProductModel product);
    }
}