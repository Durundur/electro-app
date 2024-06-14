using AutoMapper;
using electro.api.rest.Dtos;
using electro.api.rest.Filters;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;

namespace electro.api.rest.Controllers
{
    [ServiceFilter(typeof(ExceptionFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ProductsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _unitOfWork.Products.GetProducts().Include(p => p.Group).Include(p => p.Category).Include(p => p.SubCategory).ToList();
            var productsDto = _mapper.Map<IEnumerable<ProductDto>>(products);
            return Ok(productsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            var product = await _unitOfWork.Products.GetProductById(id);
            var productDto = _mapper.Map<ProductDto>(product);
            if (productDto == null) return NotFound();
            return Ok(productDto);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct(ProductDto product)
        {
            var productModel = _mapper.Map<ProductModel>(product);
            var createdProduct = await _unitOfWork.Products.CreateProduct(productModel);
            await _unitOfWork.CompleteAsync();
            return Ok(_mapper.Map<ProductDto>(createdProduct));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(string id, ProductDto product)
        {
            if (id != product.Id.ToString())
            {
                return BadRequest();
            }
            var productModel = _mapper.Map<ProductModel>(product);
            var updatedProduct = await _unitOfWork.Products.UpdateProduct(productModel);
            await _unitOfWork.CompleteAsync();
            return Ok(_mapper.Map<ProductDto>(updatedProduct));
        }


    }
}
