using Domain.ValueObjects;

namespace Rest.Application.Features.Cart.ValidateCart
{
    public class ValidateCartResult
    {
        public Guid? Id { get; set; }
        public int TotalQuantity { get; set; }
        public Money TotalPrice { get; set; }
        public IList<ValidateCartResultProduct> Products { get; set; }
        public IList<string> Errors { get; set; }
    }

    public class ValidateCartResultProduct
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Money Price { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public Money? Promotion { get; set; }
    }
}
