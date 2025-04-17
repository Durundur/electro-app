using MediatR;
using Application.Services.Models;
using Application.Services.AuthService;

namespace Rest.Application.Features.Auth.RegisterUser
{
    public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, RegisterUserResult>
    {
        private readonly IAuthService _authService;

        public RegisterUserHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<RegisterUserResult> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return new RegisterUserErrorResult("Email and password are required");
            }

            try
            {
                return await _authService.RegisterUserAsync(request.Email, request.Password, cancellationToken);
            }
            catch (Exception ex)
            {
                return new RegisterUserErrorResult($"An error occurred during registration");
            }
        }
    }
}
