using System.Net;

namespace Application.Exceptions
{
    public class ExceptionBase : Exception
    {
        public HttpStatusCode StatusCode { get; }

        protected ExceptionBase(string message, HttpStatusCode statusCode) : base(message)
        {
            StatusCode = statusCode;
        }

        protected ExceptionBase(string message, HttpStatusCode statusCode, Exception exception) : base(message, exception)
        {
            StatusCode = statusCode;
        }
    }
}
