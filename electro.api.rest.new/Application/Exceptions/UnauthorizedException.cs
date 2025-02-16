using System.Net;

namespace Application.Exceptions
{
    public class UnauthorizedException : ExceptionBase
    {
        public UnauthorizedException(string message)
            : base(message, HttpStatusCode.Forbidden)
        {
        }
    }
}
