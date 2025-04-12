using MediatR;

namespace Application.Features.Cart.ValidateAndSaveCart
{
    public class ValidateCartCommand : IRequest<ValidateCartResult>
    {
        public IList<ValidateCartCommandProduct> Products { get; set; }
    }

    public class ValidateCartCommandProduct
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
