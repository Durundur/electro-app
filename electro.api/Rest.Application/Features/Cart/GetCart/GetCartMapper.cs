using Domain.ValueObjects;
using D = Domain.Aggregates;

namespace Rest.Application.Features.Cart.GetCart
{
    public static class GetCartMapper
    {
        public static GetCartResult MapToGetCartResult(D.CartAggregate.Cart cart, IEnumerable<D.ProductCatalogAggregate.Product> products)
        {
            var productLookup = products.ToDictionary(p => p.Id);

            var cartProducts = cart.Products
                .Select(cp =>
                {
                    var product = productLookup[cp.Product.Id];
                    var currentPromotion = product.Promotion?.IsValid() == true ? product.Promotion.PromotionalPrice : null;

                    return new GetCartResultProduct
                    {
                        ProductId = cp.Product.Id,
                        Quantity = cp.Quantity,
                        Price = product.Price,
                        Promotion = currentPromotion,
                        Name = product.Name,
                        Photo = product.Photos.FirstOrDefault()
                    };
                }).ToList();

            return new GetCartResult
            {
                Id = cart.Id,
                TotalQuantity = cartProducts.Sum(p => p.Quantity),
                TotalPrice = new Money(cartProducts.Sum(p => (p.Promotion ?? p.Price).Amount * p.Quantity), "PLN"),
                Products = cartProducts
            };
        }
    }
}
