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
    }
}
