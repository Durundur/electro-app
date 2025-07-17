using Domain.Aggregates.ProductCatalogAggregate;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rest.Application.Features.Opinions.CreateOpinion;
using Rest.Application.Features.Opinions.CreateOpinionReaction;
using Rest.Application.Features.Opinions.GetOpinion;
using Rest.Application.Features.Opinions.GetProductOpinions;
using Rest.Application.Features.Opinions.GetProductOpinionsStats;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/opinions")]
    public class OpinionsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public OpinionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("products/{productId}/stats")]
        [ProducesResponseType<GetProductOpinionsStatsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetProductOpinionsStatsResult>> GetProductOpinionsStats([FromRoute] Guid productId)
        {
            var query = new GetProductOpinionsStatsQuery { ProductId = productId };
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("products/{productId}")]
        [ProducesResponseType<GetProductOpinionsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetProductOpinionsResult>> GetProductOpinions([FromRoute] Guid productId, [FromQuery] GetProductOpinionsQuery query)
        {
            query.ProductId = productId;
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpPost]
        [ProducesResponseType<CreateOpinionResult>(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CreateOpinionResult>> CreateOpinion([FromBody] CreateOpinionCommand command)
        {
            var response = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetOpinion), new { id = response.Id }, response);
        }

        [HttpGet("{id}")]
        [ProducesResponseType<GetOpinionResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GetOpinionResult>> GetOpinion([FromRoute] Guid id)
        {
            var query = new GetOpinionQuery { Id = id };
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpPost("{id}/reactions/{reactionType}")]
        [ProducesResponseType<CreateOpinionReactionResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CreateOpinionReactionResult>> CreateOpinionReaction([FromRoute] Guid id, [FromRoute] OpinionReactionType reactionType, [FromQuery] Guid productId)
        {
            var command = new CreateOpinionReactionCommand
            {
                OpinionId = id,
                ReactionType = reactionType,
                ProductId = productId
            };
            var response = await _mediator.Send(command);
            return Ok(response);
        }
    }
}
