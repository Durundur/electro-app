using System.Net;

namespace Application.Exceptions
{
    public class ForbiddenException : ExceptionBase
    {
        public ForbiddenException(string message)
            : base(message, HttpStatusCode.Forbidden)
        {
        }
    }
}
