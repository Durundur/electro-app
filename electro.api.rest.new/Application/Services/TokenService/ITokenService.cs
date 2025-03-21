﻿using Domain.Aggregates.UserAggregate;
using System.Security.Claims;

namespace Application.Services.TokenService
{
    public interface ITokenService
    {
        string GenerateToken(IUser user, IList<string> roles);
        DateTime GetRefreshTokenExpiry();
        DateTime GetTokenExpiry();
        string GenerateRefreshToken();
        ClaimsPrincipal GetTokenPrincipal(string token);
    }
}
