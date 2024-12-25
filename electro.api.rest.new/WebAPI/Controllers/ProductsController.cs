using Application.Features.ProductCatalog.GetProduct;
using Application.Features.ProductCatalog.GetProductCatalog;
using Application.Features.ProductCatalog.CreateProduct;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Features.ProductCatalog.GetSearchProducts;
using Application.Features.ProductCatalog.GetSearchFilters;

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
        public async Task<ActionResult<GetSearchProductsResult>> GetSearchProducts([FromQuery] GetSearchProductsQuery query, [FromQuery] Dictionary<string, string[]> Filters)
        {
            if (Filters.Count > 0)
            {
                var filtersToSkip = new[] { "GroupId", "CategoryId", "SubCategoryId", "PageSize", "Page" };
                query.Filters = Filters
                    .Where(p => !filtersToSkip.Contains(p.Key))
                    .ToDictionary(p => p.Key, p => p.Value);
            }
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("search/filters")]
        [ProducesResponseType<GetSearchFiltersResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetSearchFiltersResult>> GetSearchFilters([FromQuery] GetSearchFiltersQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }
    }
}
