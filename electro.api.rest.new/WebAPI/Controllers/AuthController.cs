using Application.Features.Auth.LoginUser;
using Application.Features.Auth.RefreshToken;
using Application.Features.Auth.RegisterUser;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        [ProducesResponseType<RegisterUserSuccessResult>(StatusCodes.Status200OK)]
        [ProducesResponseType<RegisterUserErrorResult>(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<RegisterUserResult>> Register([FromBody] RegisterUserCommand command)
        {
            var response = await _mediator.Send(command);
            if (response.Success)
            {
                return Ok(response);
            }
            return Unauthorized(response);
        }

        [HttpPost("login")]
        [ProducesResponseType<LoginUserSuccessResult>(StatusCodes.Status200OK)]
        [ProducesResponseType<LoginUserErrorResult>(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<LoginUserResult>> Login([FromBody] LoginUserCommand command)
        {
            var response = await _mediator.Send(command);
            if (response.Success)
            {
                return Ok(response as LoginUserSuccessResult);
            }
            return Unauthorized(response as LoginUserErrorResult);
        }

        [HttpPost("refresh-token")]
        [ProducesResponseType<RefreshTokenResult>(StatusCodes.Status200OK)]
        [ProducesResponseType<RefreshTokenResult>(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<RefreshTokenResult>> RefreshToken([FromBody] RefreshTokenCommand command)
        {
            var response = await _mediator.Send(command);
            if (response.Success)
            {
                return Ok(response);
            }
            return Unauthorized(response);
        }
    }
}
