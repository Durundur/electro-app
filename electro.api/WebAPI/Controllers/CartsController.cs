using Microsoft.AspNetCore.Mvc;
using MediatR;
using Rest.Application.Features.Cart.ValidateCart;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/carts")]
    public class CartsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CartsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("validate")]
        [ProducesResponseType<ValidateCartResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ValidateCartResult>> ValidateCart([FromBody] ValidateCartCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }
    }
}
