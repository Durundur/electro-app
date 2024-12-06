using Application.Features.ProductCatalog.GetProduct;
using Application.Features.ProductCatalog.GetProductCatalog;
using Application.Features.ProductCatalog.CreateProduct;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Features.ProductCatalog.GetSearchProducts;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        [ProducesResponseType<GetProductResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetProductResult>> GetProductById([FromRoute] string id)
        {
            if(!Guid.TryParse(id, out var productId))
            {
                return BadRequest();
            }
            var query = new GetProductQuery(productId);
            var response = await _mediator.Send(query);

            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);
        }


        [HttpGet("productCatalog")]
        [ProducesResponseType<GetProductCatalogResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetProductCatalogResult>> GetProductCatalog([FromQuery] GetProductCatalogQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpPost]
        [ProducesResponseType<CreateOrUpdateProductResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<CreateOrUpdateProductResult>> CreateOrUpdateProduct([FromBody] CreateOrUpdateProductCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [HttpGet("search")]
        [ProducesResponseType<GetSearchProductsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetSearchProductsResult>> GetSearchProducts([FromQuery] GetSearchProductsQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        /*[HttpPost("productCatalog")]
        [ProducesResponseType<GetProductCatalogResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetProductResult>> CreateProduct([FromBody])
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }*/

        /*[HttpGet("bestsellers")]
        public async Task<ActionResult<GetProduc>> GetBestsellers([FromQuery] PaginationParams paginationParams)
        {
            var productsQuery = unitOfWork.Products.GetProducts().Include(p => p.Group).Include(p => p.Category).Include(p => p.SubCategory);
            var result = await PagedResultFactory.CreatePagedResultAsync<ProductOverviewDto, ProductModel>(productsQuery, paginationParams, (items) => mapper.Map<IEnumerable<ProductOverviewDto>>(items));
            return Ok(result);
        }*/

        /*[HttpGet("recommended")]
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


        [HttpGet("search")]
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

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType<ProductDto>(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateProduct(ProductDto product)
        {
            var productModel = mapper.Map<ProductModel>(product);
            var createdProduct = await unitOfWork.Products.CreateProduct(productModel);
            await unitOfWork.CompleteAsync();
            return Ok(mapper.Map<ProductDto>(createdProduct));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType<ProductDto>(StatusCodes.Status200OK)]
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
        }*/
    }
}
