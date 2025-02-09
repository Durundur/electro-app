﻿using Application.Features.ProductHierarchy.CreateOrUpdateGroup;
using Application.Features.ProductHierarchy.DeleteGroup;
using Application.Features.ProductHierarchy.GetProductHierarchy;
using Application.Features.ProductHierarchy.CreateOrUpdateCategory;
using Application.Features.ProductHierarchy.DeleteCategory;
using Application.Features.ProductHierarchy.CreateOrUpdateSubCategory;
using Application.Features.ProductHierarchy.DeleteSubCategory;
using Application.Features.ProductHierarchy.GetMenu;
using Application.Features.ProductHierarchy.GetGroup;
using Application.Features.ProductHierarchy.GetCategory;
using Application.Features.ProductHierarchy.GetSubCategory;
using Application.Features.ProductHierarchy.GetAttributesDefinitions;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.AspNetCore.Authorization;


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

        [Authorize(Roles = "Admin")]
        [HttpPost("groups")]
        [ProducesResponseType<CreateOrUpdateGroupResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<CreateOrUpdateGroupResult>> CreateOrUpdateGroup([FromBody] CreateOrUpdateGroupCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("groups/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetGroupResult>> GetGroup([FromRoute] GetGroupQuery query)
        {
            var result = await _mediator.Send(query);
            return result;
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("groups/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteGroup([FromRoute] DeleteGroupCommand command)
        {
            var result = await _mediator.Send(command);
            if (result)
            {
                return Ok();
            }
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("categories")]
        [ProducesResponseType<CreateOrUpdateCategoryResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<CreateOrUpdateCategoryResult>> CreateOrUpdateCategory([FromBody] CreateOrUpdateCategoryCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("categories/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCategory([FromRoute] DeleteCategoryCommand command)
        {
            var result = await _mediator.Send(command);
            if (result)
            {
                return Ok();
            }
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("categories/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetCategoryResult>> GetCategory([FromRoute] GetCategoryQuery query)
        {
            var result = await _mediator.Send(query);
            return result;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("subCategories")]
        [ProducesResponseType<CreateOrUpdateSubCategoryResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<CreateOrUpdateSubCategoryResult>> CreateOrUpdateSubCategory([FromBody] CreateOrUpdateSubCategoryCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("subCategories/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteSubCategory([FromRoute] DeleteSubCategoryCommand command)
        {
            var result = await _mediator.Send(command);
            if (result)
            {
                return Ok();
            }
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("subCategories/{id}")]
        [ProducesResponseType<GetSubCategoryResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetSubCategoryResult>> GetSubCategory([FromRoute] GetSubCategoryQuery query)
        {
            var result = await _mediator.Send(query);
            return result;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("attributes-definitions")]
        [ProducesResponseType<GetAttributesDefinitionsResult>(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetAttributesDefinitionsResult>> GetAttributesDefinitions([FromQuery] GetAttributesDefinitionsQuery query)
        {
            var result = await _mediator.Send(query);
            return result;
        }
    }
}
