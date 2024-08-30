using electro.api.rest.Dtos.Cart;

namespace electro.api.rest.DTOs.Cart
{
    public class VerifyCartResultDto : CartDto
    {
        public IEnumerable<string> Messages { get; set; }
    }
}
