using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Rest.Application.Features.Auth.LoginUser;
using Rest.Application.Features.Auth.RefreshToken;
using Rest.Application.Features.Auth.RegisterUser;
using Rest.Application.Features.Auth.LogoutUser;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
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
                return Ok(response);
            }
            return Unauthorized(response);
        }

        [HttpPost("refresh-token")]
        [ProducesResponseType<RefreshTokenSuccessResult>(StatusCodes.Status200OK)]
        [ProducesResponseType<RefreshTokenErrorResult>(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<RefreshTokenResult>> RefreshToken([FromBody] RefreshTokenCommand command)
        {
            var response = await _mediator.Send(command);
            if (response.Success)
            {
                return Ok(response);
            }
            return Unauthorized(response);
        }

        [HttpPost("logout")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Logout()
        {
            var command = new LogoutUserCommand();
            var response = await _mediator.Send(command);
            return Ok(response);
        }
    }
}
