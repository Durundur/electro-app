using Application.Features.Cart.GetCart;
using Application.Features.Cart.ValidateAndSaveCart;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CartsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{UserId}")]
        [ProducesResponseType<GetCartResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetCartResult>> GetUserCart(Guid UserId)
        {
            var query = new GetCartQuery
            {
                UserId = UserId
            };
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpPost("validate")]
        [ProducesResponseType<ValidateCartResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ValidateCartResult>> ValidateCart([FromBody] ValidateCartCommand command)
        {
            command.UserId = new Guid("06E85F9E-084A-4F7A-A41C-BAA9A6A35189");
            var response = await _mediator.Send(command);
            return Ok(response);
        }
    }
}
