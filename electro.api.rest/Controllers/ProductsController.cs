using electro.api.rest.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace electro.api.rest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet]
        public IActionResult GetProductsSummary() {

            var products = _productService.GetProductsSummary();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(string id)
        {
            var product = _productService.GetProductById(id);
            return Ok(product);
        }


        [HttpPost]
        public IActionResult CreateNewProduct(ProductDto product)
        {
            var newProduct = _productService.CreateProduct(product);
            return Ok(newProduct);
        }
    }
}
