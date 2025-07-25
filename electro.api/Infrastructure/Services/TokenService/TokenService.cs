﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Domain.Aggregates.UserAggregate;
using Application.Services.TokenService;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services.TokenService
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        public (string, DateTime) GenerateToken(IUser user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Value);
            var expiresAt = GetTokenExpiry();

            var tokenDescriptor = new JwtSecurityToken(
               issuer: _configuration.GetSection("Jwt:Issuer").Value,
               claims: claims,
               expires: expiresAt,
               signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            );

            return (new JwtSecurityTokenHandler().WriteToken(tokenDescriptor), expiresAt);
        }

        public (string, DateTime) GenerateRefreshToken()
        {
            var randomNumber = new byte[64];

            using (var numberGenerator = RandomNumberGenerator.Create())
            {
                numberGenerator.GetBytes(randomNumber);
            }

            return (Convert.ToBase64String(randomNumber), GetRefreshTokenExpiry());
        }

        private DateTime GetRefreshTokenExpiry()
        {
            return DateTime.UtcNow.AddMinutes(Double.Parse(_configuration.GetSection("Jwt:RefreshTokenExpirationTimeMinutes").Value));
        }

        private DateTime GetTokenExpiry()
        {
            return DateTime.UtcNow.AddMinutes(Double.Parse(_configuration.GetSection("Jwt:ExpirationTimeMinutes").Value));
        }

        public ClaimsPrincipal GetTokenPrincipal(string token)
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
    }
}
