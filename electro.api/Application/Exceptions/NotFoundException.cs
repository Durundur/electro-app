using System.Net;

namespace Application.Exceptions
{
    public class NotFoundException : ExceptionBase
    {
        public NotFoundException(string message)
            : base(message, HttpStatusCode.NotFound)
        {
        }

        public NotFoundException(string name, object key)
            : base($"Entity \"{name}\" ({key}) was not found.", HttpStatusCode.NotFound)
        {
        }
    }
}
