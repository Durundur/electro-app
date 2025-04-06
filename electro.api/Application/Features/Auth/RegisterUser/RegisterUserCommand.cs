using MediatR;

namespace Application.Features.Auth.RegisterUser
{
    public class RegisterUserCommand: IRequest<RegisterUserResult>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
