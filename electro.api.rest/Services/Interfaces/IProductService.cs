using electro.api.rest.Dtos;

public interface IProductService
{
    ProductDto GetProductById(string id);
    ProductDto CreateProduct(ProductDto product);
    IEnumerable<ProductSummaryDto> GetProductsSummary();
}