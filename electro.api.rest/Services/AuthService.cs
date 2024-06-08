using electro.api.rest.Dtos;
using electro.api.rest.Models;
using electro.api.rest.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace electro.api.rest.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<UserModel> _userManager;
        private readonly RoleManager<RoleModel> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<UserModel> userManager, RoleManager<RoleModel> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto> Login(AuthRequestDto credentials)
        {
            var user = await _userManager.FindByEmailAsync(credentials.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, credentials.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var response = new AuthResponseDto()
                {
                    JwtToken = this.GenerateTokenString(user, userRoles),
                    RefreshToken = this.GenerateRefreshTokenString(),
                    Success = true,
                    Message = "Successfully signed in.",
                    Roles = userRoles,
                    UserId = user.Id.ToString(),
                    TokenExpiry = DateTime.Now.AddMinutes(Double.Parse(_configuration.GetSection("Jwt:ExpirationTimeMinutes").Value)).ToUniversalTime(),
                };
                user.RefreshToken = response.RefreshToken;
                user.RefreshTokenExpiry = DateTime.Now.AddMinutes(Double.Parse(_configuration.GetSection("Jwt:RefreshTokenExpirationTimeMinutes").Value)).ToUniversalTime();
                await _userManager.UpdateAsync(user);
                return response;
            }
            return new AuthResponseDto()
            {
                Success = false,
                Message = "Login failed, wrong credentials",
            };
        }

        public async Task<AuthResponseDto> Register(AuthRequestDto credentials)
        {
            var user = new UserModel
            {
                UserName = credentials.Email,
                Email = credentials.Email
            };
            var userResult = await _userManager.CreateAsync(user, credentials.Password);
            if(userResult.Succeeded) {

                var userRole = await _roleManager.FindByNameAsync("User");
                if(userRole == null)
                {
                    var roleResult = await _roleManager.CreateAsync(new RoleModel("User"));
                    if(!roleResult.Succeeded)
                    {
                        throw new InvalidOperationException("Cant create account");
                    }
                    await _userManager.AddToRolesAsync(user, new List<string>() { "User" });
                }
                var userRoles = await _userManager.GetRolesAsync(user);
                var response = new AuthResponseDto()
                {
                    JwtToken = this.GenerateTokenString(user, userRoles),
                    RefreshToken = this.GenerateRefreshTokenString(),
                    Success = true,
                    Message = "Successfully registered.",
                    Roles = userRoles,
                    UserId = user.Id.ToString(),
                    TokenExpiry = DateTime.Now.AddMinutes(Double.Parse(_configuration.GetSection("Jwt:ExpirationTimeMinutes").Value)).ToUniversalTime(),
                };
                user.RefreshToken = response.RefreshToken;
                user.RefreshTokenExpiry = DateTime.Now.AddMinutes(Double.Parse(_configuration.GetSection("Jwt:RefreshTokenExpirationTimeMinutes").Value)).ToUniversalTime();
                await _userManager.UpdateAsync(user);
                return response;
            }
            return new AuthResponseDto
            {
                Success = false,
                Message = "Registration failed"
            };
        }

        public async Task<AuthResponseDto> RefreshToken(RefreshTokenRequest jwt)
        {
            var principal = GetTokenPrincipal(jwt.JwtToken);
            if (principal == null)
                return new AuthResponseDto() { Success = false, Message = "Invalid JWT token" };

            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return new AuthResponseDto() { Success = false, Message = "Invalid JWT token" };

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null || user.RefreshToken != jwt.RefreshToken || user.RefreshTokenExpiry < DateTime.Now)
                return new AuthResponseDto() { Success = false };

            var userRoles = await _userManager.GetRolesAsync(user);
            var response = new AuthResponseDto()
            {
                JwtToken = this.GenerateTokenString(user, userRoles),
                RefreshToken = this.GenerateRefreshTokenString(),
                Success = true,
                Message = "Successfully refreshed token.",
                Roles = userRoles,
                UserId = user.Id.ToString(),
                TokenExpiry = DateTime.Now.AddMinutes(Double.Parse(_configuration.GetSection("Jwt:ExpirationTimeMinutes").Value)).ToUniversalTime(),
            };
            user.RefreshToken = response.RefreshToken;
            user.RefreshTokenExpiry = DateTime.Now.AddMinutes(Double.Parse(_configuration.GetSection("Jwt:RefreshTokenExpirationTimeMinutes").Value)).ToUniversalTime();
            await _userManager.UpdateAsync(user);
            return response;
        }

        private ClaimsPrincipal? GetTokenPrincipal(string token)
        {
            var validation = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidIssuer = _configuration.GetSection("Jwt:Issuer").Value,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Value)),
                RequireExpirationTime = true,
                ValidateLifetime = false,

                ValidateActor = false,
                ValidateAudience = false,
            };
            return new JwtSecurityTokenHandler().ValidateToken(token, validation, out _);
        }

        private string GenerateRefreshTokenString()
        {
            var randomNumber = new byte[64];

            using (var numberGenerator = RandomNumberGenerator.Create())
            {
                numberGenerator.GetBytes(randomNumber);
            }

            return Convert.ToBase64String(randomNumber);
        }

        private string GenerateTokenString(UserModel user, IEnumerable<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email,user.Email)
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var staticKey = _configuration.GetSection("Jwt:Key").Value;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(staticKey));
            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var securityToken = new JwtSecurityToken(
                issuer: _configuration.GetSection("Jwt:Issuer").Value,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Double.Parse(_configuration.GetSection("Jwt:ExpirationTimeMinutes").Value)).ToUniversalTime(),
                signingCredentials: signingCred
                );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }
    }
}
