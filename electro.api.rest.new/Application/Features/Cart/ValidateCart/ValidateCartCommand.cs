using Domain.ValueObjects;
using MediatR;

namespace Application.Features.Cart.ValidateAndSaveCart
{
    public class ValidateCartCommand: IRequest<ValidateCartResult>
    {
        public Guid? UserId { get; set; }
        public IList<ValidateAndSaveCartCommandProduct> Products { get; set; }
    }

    public class ValidateAndSaveCartCommandProduct
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Money Price { get; set; }
    }
}
