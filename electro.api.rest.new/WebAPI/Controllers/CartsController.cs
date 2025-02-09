using Application.Features.Cart.ValidateAndSaveCart;
using Microsoft.AspNetCore.Mvc;
using MediatR;

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
