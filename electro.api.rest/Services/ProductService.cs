using AutoMapper;
using electro.api.rest.Dtos;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using electro.api.rest.Services.Interfaces;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository productRepository, IMapper mapper)
    {
        _productRepository = productRepository;
        _mapper = mapper;
    }

    public IEnumerable<ProductSummaryDto> GetProductsSummary()
    {
        var products = _productRepository.GetAllProducts();
        var productsDto = _mapper.Map<IEnumerable<ProductDto>>(products);
        var productsSummary = productsDto.Select(p => new ProductSummaryDto()
        {
            Id = p.Id.GetValueOrDefault(),
            Name = p.Name,
            Group = p.Group,
            Category = p.Category,
            SubCategory = p.SubCategory,
            Features = p.Features,
            Price = p.Price,
            Photo = p.Photos.First(),
            StockQuantity = p.StockQuantity,
        });
        return productsSummary;
    }

    public ProductDto GetProductById(string id)
    {
        var product = _productRepository.GetProductById(id);
        return _mapper.Map<ProductDto>(product);
    }

    public ProductDto CreateProduct(ProductDto product)
    {
        var productModel = _mapper.Map<ProductModel>(product);
        _productRepository.CreateProduct(productModel);
        return _mapper.Map<ProductDto>(productModel);
    }
}