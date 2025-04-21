using Microsoft.AspNetCore.Mvc;
using MediatR;
using Rest.Application.Features.Cart.GetRecipients;
using Rest.Application.Features.Cart.DeleteRecipient;
using Rest.Application.Features.Cart.CreateOrUpdateRecipient;
using Rest.Application.Features.Cart.GetCart;
using Rest.Application.Features.Order.GetUserOrderDetails;
using Rest.Application.Features.Order.GetUserOrders;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize]
        [HttpGet("{userId}/recipients")]
        [ProducesResponseType<GetRecipientsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetRecipientsResult>> GetUserRecipients([FromRoute] GetRecipientsQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [Authorize]
        [HttpPost("{userId}/recipients")]
        [ProducesResponseType<CreateOrUpdateRecipientResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CreateOrUpdateRecipientResult>> CreateOrUpdateUserRecipient([FromBody] CreateOrUpdateRecipientCommand command, [FromRoute] Guid UserId)
        {
            command.UserId = UserId;
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("{userId}/recipients/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteRecipient([FromRoute] DeleteRecipientCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [Authorize]
        [HttpGet("{userId}/cart")]
        [ProducesResponseType<GetCartResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetCartResult>> GetUserCart([FromRoute] GetCartQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [Authorize]
        [HttpGet("{userId}/orders")]
        [ProducesResponseType<GetUserOrdersResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetUserOrdersResult>> GetUserOrders([FromRoute] Guid UserId, [FromQuery] int Page = 1, [FromQuery] int PageSize = 10)
        {
            var query = new GetUserOrdersQuery()
            {
                UserId = UserId,
                Page = Page,
                PageSize = PageSize,
            };
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [Authorize]
        [HttpGet("{userId}/orders/{orderId}")]
        [ProducesResponseType<GetUserOrderDetailsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetUserOrderDetailsResult>> GetUserOrderDetails([FromRoute] GetUserOrderDetailsQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }
    }
}
