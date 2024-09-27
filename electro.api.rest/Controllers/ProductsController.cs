using AutoMapper;
using electro.api.rest.ActionFilters;
using electro.api.rest.Dtos.Product;
using electro.api.rest.DTOs.Product;
using electro.api.rest.Models.Product;
using electro.api.rest.QueryFilters;
using electro.api.rest.Reposiotories.Interfaces;
using electro.api.rest.Utils.PagedResult;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Controllers
{
    [ServiceFilter(typeof(ExceptionFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public ProductsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = unitOfWork.Products.GetProducts().Include(p => p.Group).Include(p => p.Category).Include(p => p.SubCategory).ToList();
            var productsDto = mapper.Map<IEnumerable<ProductDto>>(products);
            return Ok(productsDto);
        }

        [HttpGet("bestsellers")]
        public async Task<IActionResult> GetBestsellers([FromQuery] PaginationParams paginationParams)
        {
            var productsQuery = unitOfWork.Products.GetProducts().Include(p => p.Group).Include(p => p.Category).Include(p => p.SubCategory);
            var result = await PagedResultFactory.CreatePagedResultAsync<ProductOverviewDto, ProductModel>(productsQuery, paginationParams, (items) => mapper.Map<IEnumerable<ProductOverviewDto>>(items));
            return Ok(result);
        }

        [HttpGet("recommended")]
        public async Task<IActionResult> GetRecommended([FromQuery] PaginationParams paginationParams)
        {
            var productsQuery = unitOfWork.Products.GetProducts().Include(p => p.Group).Include(p => p.Category).Include(p => p.SubCategory);
            var result = await PagedResultFactory.CreatePagedResultAsync<ProductOverviewDto, ProductModel>(productsQuery, paginationParams, (items) => mapper.Map<IEnumerable<ProductOverviewDto>>(items));
            return Ok(result);
        }

        [HttpGet("hits")]
        public async Task<IActionResult> GetHits([FromQuery] PaginationParams paginationParams)
        {
            var productsQuery = unitOfWork.Products.GetProducts().Include(p => p.Group).Include(p => p.Category).Include(p => p.SubCategory);
            var result = await PagedResultFactory.CreatePagedResultAsync<ProductOverviewDto, ProductModel>(productsQuery, paginationParams, (items) => mapper.Map<IEnumerable<ProductOverviewDto>>(items));
            return Ok(result);
        }


        [HttpPost("search")]
        public async Task<IActionResult> SearchProducts([FromQuery] PaginationParams paginationParams, [FromBody] ProductParams productParams, [FromQuery] string? query = "")
        {
            var productsQuery = unitOfWork.Products.GetProducts()
                .Include(p => p.Group)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .Include(p => p.Specification)
                .AsQueryable();

            if (productParams.Group.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.GroupId == productParams.Group.Value);
            }
            if (productParams.Category.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.CategoryId == productParams.Category.Value);
            }
            if (productParams.Subcategory.HasValue)
            {
                productsQuery = productsQuery.Where(p => p.SubCategoryId == productParams.Subcategory.Value);
            }

            if (!string.IsNullOrEmpty(query))
            {
                productsQuery = productsQuery.Where(p => p.Name.ToLower().Contains(query.ToLower()));
            }
            var pagedResponse = await PagedResultFactory.CreatePagedResultAsync<ProductOverviewDto, ProductModel>(
                productsQuery,
                paginationParams,
                (items) => mapper.Map<IEnumerable<ProductOverviewDto>>(items));
            
            return Ok(pagedResponse);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            var product = await unitOfWork.Products.GetProductById(id);
            var productDto = mapper.Map<ProductDto>(product);
            if (productDto == null) return NotFound();
            return Ok(productDto);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct(ProductDto product)
        {
            var productModel = mapper.Map<ProductModel>(product);
            var createdProduct = await unitOfWork.Products.CreateProduct(productModel);
            await unitOfWork.CompleteAsync();
            return Ok(mapper.Map<ProductDto>(createdProduct));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(string id, ProductDto product)
        {
            if (id != product.Id.ToString())
            {
                return BadRequest();
            }
            var productModel = mapper.Map<ProductModel>(product);
            var updatedProduct = await unitOfWork.Products.UpdateProduct(productModel);
            await unitOfWork.CompleteAsync();
            return Ok(mapper.Map<ProductDto>(updatedProduct));
        }
    }
}
