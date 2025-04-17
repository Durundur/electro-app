using Application.Services.Models;
using MediatR;

namespace Rest.Application.Features.Auth.LoginUser
{
    public class LoginUserCommand : IRequest<LoginUserResult>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
