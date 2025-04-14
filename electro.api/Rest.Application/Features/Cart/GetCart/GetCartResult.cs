using Domain.ValueObjects;

namespace Rest.Application.Features.Cart.GetCart
{
    public class GetCartResult
    {
        public Guid Id { get; set; }
        public int TotalQuantity { get; set; }
        public Money TotalPrice { get; set; }
        public IList<GetCartResultProduct> Products { get; set; }

    }

    public class GetCartResultProduct
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Money Price { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public Money Promotion { get; set; }
    }
}
