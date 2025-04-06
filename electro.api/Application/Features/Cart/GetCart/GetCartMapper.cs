using Domain.ValueObjects;
using D = Domain.Aggregates;

namespace Application.Features.Cart.GetCart
{
    public static class GetCartMapper
    {
        public static GetCartResult MapToGetCartResult(D.CartAggregate.Cart cart, IEnumerable<D.ProductCatalogAggregate.Product> products)
        {
            var productLookup = products.ToDictionary(p => p.Id);

            var cartProducts = cart.Products
                .Select(cp => new GetCartResultProduct
                {
                    ProductId = cp.ProductId,
                    Quantity = cp.Quantity,
                    Price = cp.UnitPrice,
                    Name = productLookup[cp.ProductId].Name,
                    Photo = productLookup[cp.ProductId].Photos.FirstOrDefault()
                }).ToList();

            return new GetCartResult
            {
                Id = cart.Id,
                TotalQuantity = cartProducts.Sum(p => p.Quantity),
                TotalPrice = new Money(cartProducts.Sum(p => p.Price.Amount * p.Quantity), "PLN"),
                Products = cartProducts
            };
        }
    }
}
