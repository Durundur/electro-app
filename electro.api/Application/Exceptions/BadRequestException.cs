using System.Net;

namespace Application.Exceptions
{
    public class BadRequestException : ExceptionBase
    {
        public BadRequestException(string message)
            : base(message, HttpStatusCode.BadRequest)
        {
        }

        public BadRequestException(string message, Exception exception)
            : base(message, HttpStatusCode.BadRequest, exception)
        {
        }
    }
}
