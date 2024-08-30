using electro.api.rest.Dtos.Auth;
using electro.api.rest.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace electro.api.rest.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginDto credentials)
        {
            var loginResult = await authService.Login(credentials);
            if(loginResult.Success)
            {
                return Ok(loginResult);
            }
            return Unauthorized(loginResult);
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register(RegisterDto credentials) 
        {
            var reqisterResult = await authService.Register(credentials);
            if (reqisterResult.Success)
            {
                return Ok(reqisterResult);
            }
            return Unauthorized(reqisterResult);
        }

        [HttpPost("RefreshToken")]
        public async Task<ActionResult> RefreshToken(RefreshTokenDto jwt)
        { 
            var response = await authService.RefreshToken(jwt);
            if (response.Success)
            {
                return Ok(response);
            }
            return Unauthorized(response);
        }
    }
}
