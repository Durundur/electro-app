using electro.api.rest.Dtos.Auth;
using electro.api.rest.Models.Auth;
using electro.api.rest.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace electro.api.rest.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<UserModel> userManager;
        private readonly RoleManager<RoleModel> roleManager;
        private readonly IConfiguration configuration;

        public AuthService(UserManager<UserModel> userManager, RoleManager<RoleModel> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
        }

        public async Task<AuthDto> Login(LoginDto credentials)
        {
            var user = await userManager.FindByEmailAsync(credentials.Email);

            if (user != null && await userManager.CheckPasswordAsync(user, credentials.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);
                var response = new AuthDto()
                {
                    JwtToken = this.GenerateTokenString(user, userRoles),
                    RefreshToken = this.GenerateRefreshTokenString(),
                    Success = true,
                    Message = "Successfully signed in.",
                    Roles = userRoles,
                    UserId = user.Id.ToString(),
                    TokenExpiry = DateTime.Now.AddMinutes(Double.Parse(configuration.GetSection("Jwt:ExpirationTimeMinutes").Value)).ToUniversalTime(),
                };
                user.RefreshToken = response.RefreshToken;
                user.RefreshTokenExpiry = DateTime.Now.AddMinutes(Double.Parse(configuration.GetSection("Jwt:RefreshTokenExpirationTimeMinutes").Value)).ToUniversalTime();
                await userManager.UpdateAsync(user);
                return response;
            }
            return new AuthDto()
            {
                Success = false,
                Message = "Login failed, wrong credentials",
            };
        }

        public async Task<AuthDto> Register(RegisterDto credentials)
        {
            var user = new UserModel
            {
                UserName = credentials.Email,
                Email = credentials.Email
            };
            var userResult = await userManager.CreateAsync(user, credentials.Password);
            if(userResult.Succeeded) {

                var userRole = await roleManager.FindByNameAsync("User");
                if(userRole == null)
                {
                    var roleResult = await roleManager.CreateAsync(new RoleModel("User"));
                    if(!roleResult.Succeeded)
                    {
                        throw new InvalidOperationException("Cant create account");
                    }
                    await userManager.AddToRolesAsync(user, new List<string>() { "User" });
                }
                var userRoles = await userManager.GetRolesAsync(user);
                var response = new AuthDto()
                {
                    JwtToken = this.GenerateTokenString(user, userRoles),
                    RefreshToken = this.GenerateRefreshTokenString(),
                    Success = true,
                    Message = "Successfully registered.",
                    Roles = userRoles,
                    UserId = user.Id.ToString(),
                    TokenExpiry = DateTime.Now.AddMinutes(Double.Parse(configuration.GetSection("Jwt:ExpirationTimeMinutes").Value)).ToUniversalTime(),
                };
                user.RefreshToken = response.RefreshToken;
                user.RefreshTokenExpiry = DateTime.Now.AddMinutes(Double.Parse(configuration.GetSection("Jwt:RefreshTokenExpirationTimeMinutes").Value)).ToUniversalTime();
                await userManager.UpdateAsync(user);
                return response;
            }
            return new AuthDto
            {
                Success = false,
                Message = "Registration failed"
            };
        }

        public async Task<AuthDto> RefreshToken(RefreshTokenDto jwt)
        {
            var principal = GetTokenPrincipal(jwt.JwtToken);
            if (principal == null)
                return new AuthDto() { Success = false, Message = "Invalid JWT token" };

            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return new AuthDto() { Success = false, Message = "Invalid JWT token" };

            var user = await userManager.FindByIdAsync(userId);
            if (user == null || user.RefreshToken != jwt.RefreshToken || user.RefreshTokenExpiry < DateTime.Now)
                return new AuthDto() { Success = false };

            var userRoles = await userManager.GetRolesAsync(user);
            var response = new AuthDto()
            {
                JwtToken = this.GenerateTokenString(user, userRoles),
                RefreshToken = this.GenerateRefreshTokenString(),
                Success = true,
                Message = "Successfully refreshed token.",
                Roles = userRoles,
                UserId = user.Id.ToString(),
                TokenExpiry = DateTime.Now.AddMinutes(Double.Parse(configuration.GetSection("Jwt:ExpirationTimeMinutes").Value)).ToUniversalTime(),
            };
            user.RefreshToken = response.RefreshToken;
            user.RefreshTokenExpiry = DateTime.Now.AddMinutes(Double.Parse(configuration.GetSection("Jwt:RefreshTokenExpirationTimeMinutes").Value)).ToUniversalTime();
            await userManager.UpdateAsync(user);
            return response;
        }

        private ClaimsPrincipal? GetTokenPrincipal(string token)
        {
            var validation = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidIssuer = configuration.GetSection("Jwt:Issuer").Value,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("Jwt:Key").Value)),
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
            var staticKey = configuration.GetSection("Jwt:Key").Value;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(staticKey));
            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var securityToken = new JwtSecurityToken(
                issuer: configuration.GetSection("Jwt:Issuer").Value,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Double.Parse(configuration.GetSection("Jwt:ExpirationTimeMinutes").Value)).ToUniversalTime(),
                signingCredentials: signingCred
                );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }
    }
}
