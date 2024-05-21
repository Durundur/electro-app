
namespace electro.api.rest.Dtos
{
    public class Response
    {
        public Response(dynamic data) {
            Data = data;
        }
        public Response(string message, bool success)
        {
            Message = message;
            Success = success;
        }
        public dynamic Data {get; set;}
        public string? Message { get; set;}
        public bool Success { get; set; } = true;

    }
}
