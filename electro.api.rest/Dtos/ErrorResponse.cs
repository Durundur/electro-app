namespace electro.api.rest.Dtos
{
    public class ErrorResponse
    {
        public ErrorResponse(string message) {
            Message = message;
        }

        public ErrorResponse(string message, string details)
        {
            Message = message;
            Details = details;
        }

        public string Message { get; set; }

        public string Details { get; set; }
    }
}
