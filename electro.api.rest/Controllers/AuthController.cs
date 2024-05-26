﻿using electro.api.rest.Dtos;
using electro.api.rest.Services;
using electro.api.rest.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace electro.api.rest.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(AuthRequestDto credentials)
        {
            var loginResult = await _authService.Login(credentials);
            if(loginResult.Success)
            {
                return Ok(loginResult);
            }
            return Unauthorized(loginResult);
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register(AuthRequestDto credentials) 
        {
            var reqisterResult = await _authService.Register(credentials);
            if (reqisterResult.Success)
            {
                return Ok(reqisterResult);
            }
            return Unauthorized(reqisterResult);
        }

        [HttpPost("RefreshToken")]
        public async Task<ActionResult> RefreshToken(RefreshTokenRequest jwt)
        { 
            var response = await _authService.RefreshToken(jwt);
            if (response.Success)
            {
                return Ok(response);
            }
            return Unauthorized(response);
        }
    }
}
