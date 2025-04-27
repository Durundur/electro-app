using Application.Exceptions;
using Application.Services.AuthService;
using Application.Services.Models;
using Application.Services.UserContext;
using Graphql.Application.Mutations.Inputs;
using HotChocolate;
using HotChocolate.Authorization;

namespace Graphql.Application.Mutations
{
    public partial class Mutation
    {
        public async Task<LoginUserResult> LoginUser([Service] IAuthService authService, LoginInput input, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrEmpty(input.Email) || string.IsNullOrEmpty(input.Password))
            {
                return new LoginUserErrorResult("Email and password are required");
            }

            try
            {
                var result = await authService.LoginUserAsync(input.Email, input.Password, cancellationToken);

                if (!result.Success)
                {
                    throw new UnauthorizedException(result.Message);
                }

                return result;
            }
            catch (Exception ex)
            {
                return new LoginUserErrorResult("An error occurred during login. Please try again");
            }
        }

        public async Task<RegisterUserResult> RegisterUser([Service] IAuthService authService, RegisterInput input, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(input.Email) || string.IsNullOrEmpty(input.Password))
            {
                return new RegisterUserErrorResult("Email and password are required");
            }

            try
            {
                return await authService.RegisterUserAsync(input.Email, input.Password, cancellationToken);
            }
            catch (Exception ex)
            {
                return new RegisterUserErrorResult($"An error occurred during registration");
            }
        }

        public async Task<RefreshTokenResult> RefreshToken([Service] IAuthService authService, RefreshTokenInput input, CancellationToken cancellationToken)
        {
            try
            {
                return await authService.RefreshTokenAsync(input.RefreshToken, input.Token, cancellationToken);
            }
            catch (Exception ex)
            {
                return new RefreshTokenErrorResult($"An error occurred during token refresh.");
            }
        }

        [Authorize]
        public async Task<bool> LogoutUser([Service] IAuthService authService, [Service] IUserContext userContext, CancellationToken cancellationToken)
        {
            try
            {
                if (!userContext.IsAuthenticated)
                {
                    throw new UnauthorizedException("User must be authenticated to logout.");
                }

                return await authService.LogoutUserAsync(userContext.UserId, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new BadRequestException("An error occurred during logout.", ex);
            }
        }
    }
}
