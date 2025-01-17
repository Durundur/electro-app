using Application.Features.Cart.CreateOrUpdateRecipient;
using Application.Features.Cart.DeleteRecipient;
using Application.Features.Cart.GetRecipients;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{userId}/recipients")]
        [ProducesResponseType<GetRecipientsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetRecipientsResult>> GetUserRecipients(Guid userId)
        {
            var query = new GetRecipientsQuery { UserId = userId };
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpPost("{userId}/recipients")]
        [ProducesResponseType<CreateOrUpdateRecipientResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CreateOrUpdateRecipientResult>> CreateOrUpdateUserRecipient([FromBody] CreateOrUpdateRecipientCommand command, Guid userId)
        {
            command.UserProfileId = userId;
            var response = await _mediator.Send(command);
            return Ok(response);
        }


        [HttpDelete("{userId}/recipients/{recipientId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteRecipient(Guid recipientId, Guid userId)
        {
            var command = new DeleteRecipientCommand
            {
                Id = recipientId,
                UserProfileId = userId,
            };
            var response = await _mediator.Send(command);
            return Ok(response);
        }
    }
}
