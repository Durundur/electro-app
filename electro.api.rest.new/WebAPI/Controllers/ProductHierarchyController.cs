using Application.Features.ProductHierarchy.CreateOrUpdateGroup;
using Application.Features.ProductHierarchy.DeleteGroup;
using Application.Features.ProductHierarchy.GetProductHierarchy;
using Application.Features.ProductHierarchy.CreateOrUpdateCategory;
using Application.Features.ProductHierarchy.DeleteCategory;
using Application.Features.ProductHierarchy.CreateOrUpdateSubCategory;
using Application.Features.ProductHierarchy.DeleteSubCategory;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Features.ProductHierarchy.GetMenu;
using Application.Features.ProductHierarchy.GetGroup;
using Application.Features.ProductHierarchy.GetCategory;
using Application.Features.ProductHierarchy.GetSubCategory;
using Application.Features.ProductHierarchy.GetAttributesDefinitions;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductHierarchyController: ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductHierarchyController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("menu")]
        [ProducesResponseType<GetMenuResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetMenuResult>> GetMenu()
        {
            var query = new GetMenuQuery();
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpGet]
        [ProducesResponseType<GetAllProductHierarchyResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetAllProductHierarchyResult>> GetAllProductHierarchies()
        {
            var query = new GetAllProductHierarchyQuery();
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpPost("groups")]
        [ProducesResponseType<CreateOrUpdateGroupResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<CreateOrUpdateGroupResult>> CreateOrUpdateGroup([FromBody] CreateOrUpdateGroupCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpGet("groups/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetGroupResult>> GetGroup(int id)
        {
            var command = new GetGroupQuery() { Id = id };
            var result = await _mediator.Send(command);
            return result;
        }

        [HttpDelete("groups/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            var command = new DeleteGroupCommand() { Id = id };
            var result = await _mediator.Send(command);
            if (result)
            {
                return Ok();
            }
            return NoContent();
        }

        [HttpPost("categories")]
        [ProducesResponseType<CreateOrUpdateCategoryResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<CreateOrUpdateCategoryResult>> CreateOrUpdateCategory([FromBody] CreateOrUpdateCategoryCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpDelete("categories/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var command = new DeleteCategoryCommand() { Id = id };
            var result = await _mediator.Send(command);
            if (result)
            {
                return Ok();
            }
            return NoContent();
        }

        [HttpGet("categories/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetCategoryResult>> GetCategory(int id)
        {
            var command = new GetCategoryQuery() { Id = id };
            var result = await _mediator.Send(command);
            return result;
        }

        [HttpPost("subCategories")]
        [ProducesResponseType<CreateOrUpdateSubCategoryResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<CreateOrUpdateSubCategoryResult>> CreateOrUpdateSubCategory([FromBody] CreateOrUpdateSubCategoryCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpDelete("subCategories/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteSubCategory(int id)
        {
            var command = new DeleteSubCategoryCommand() { Id = id };
            var result = await _mediator.Send(command);
            if (result)
            {
                return Ok();
            }
            return NoContent();
        }

        [HttpGet("subCategories/{id}")]
        [ProducesResponseType<GetSubCategoryResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetSubCategoryResult>> GetSubCategory(int id)
        {
            var command = new GetSubCategoryQuery() { Id = id };
            var result = await _mediator.Send(command);
            return result;
        }

        [HttpGet("attributes-definitions")]
        [ProducesResponseType<GetAttributesDefinitionsResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetAttributesDefinitionsResult>> GetAttributesDefinitions([FromQuery] GetAttributesDefinitionsQuery query)
        {
            var result = await _mediator.Send(query);
            return result;
        }
    }
}
