using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Rest.Application.Features.ProductCatalog.GetBestsellerProducts;
using Rest.Application.Features.ProductCatalog.GetProduct;
using Rest.Application.Features.ProductCatalog.GetSimilarProducts;
using Rest.Application.Features.ProductCatalog.GetFeaturedProducts;
using Rest.Application.Features.ProductCatalog.GetPromotionHighlight;
using Rest.Application.Features.ProductCatalog.CreateOrUpdateProduct;
using Rest.Application.Features.ProductCatalog.GetSearchProducts;
using Rest.Application.Features.ProductCatalog.GetProductCatalog;
using Rest.Application.Features.ProductCatalog.GetSearchFilters;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/products")]
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
        public async Task<ActionResult<GetProductResult>> GetProductById([FromRoute] Guid id)
        {
            var query = new GetProductQuery
            {
                Id = id
            };

            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("{id}/similar")]
        [ProducesResponseType<GetSimilarProductsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetSimilarProductsResult>> GetSimilarProducts([FromRoute] Guid id, [FromQuery] int limit = 8)
        {
            var query = new GetSimilarProductsQuery
            {
                ProductId = id,
                Limit = Math.Min(limit, 20)
            };

            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("catalog")]
        [ProducesResponseType<GetProductCatalogResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetProductCatalogResult>> GetProductCatalog([FromQuery] GetProductCatalogQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
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

        [HttpGet("filters")]
        [ProducesResponseType<GetSearchFiltersResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetSearchFiltersResult>> GetSearchFilters([FromQuery] GetSearchFiltersQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("bestsellers")]
        [ProducesResponseType<GetBestsellerProductsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetBestsellerProductsResult>> GetBestsellerProducts([FromQuery] int limit = 10)
        {
            var query = new GetBestsellerProductsQuery { Limit = Math.Min(limit, 50) };
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("featured")]
        [ProducesResponseType<GetFeaturedProductsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetFeaturedProductsResult>> GetFeaturedProducts([FromQuery] int limit = 10)
        {
            var query = new GetFeaturedProductsQuery { Limit = Math.Min(limit, 50) };
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("promotion-highlight")]
        [ProducesResponseType<GetPromotionHighlightResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetPromotionHighlightResult>> GetPromotionHighlight()
        {
            var query = new GetPromotionHighlightQuery();
            var response = await _mediator.Send(query);
            return Ok(response);
        }
    }
}
