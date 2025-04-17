using MediatR;
using Application.Services.Models;
using Application.Services.AuthService;

namespace Rest.Application.Features.Auth.LoginUser
{
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, LoginUserResult>
    {
        
        private readonly IAuthService _authService;

        public LoginUserHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<LoginUserResult> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return new LoginUserErrorResult("Email and password are required");
            }

            try
            {
                return await _authService.LoginUserAsync(request.Email, request.Password, cancellationToken);
            }
            catch (Exception ex)
            {
                return new LoginUserErrorResult("An error occurred during login. Please try again");
            }
        }
    }
}
