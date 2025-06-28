using Domain.ValueObjects;

namespace Rest.Application.Features.Cart.ValidateCart
{
    public static class ValidateCartMapper
    {
        public static ValidateCartResult MapToValidateCartResult(Domain.Aggregates.CartAggregate.Cart cart, List<string> errors)
        {
            return new ValidateCartResult
            {
                Id = cart?.Id,
                TotalQuantity = cart.TotalQuantity,
                TotalPrice = cart?.TotalPrice ?? new Money(0, "PLN"),
                Products = cart?.Products.Select(p => new ValidateCartResultProduct
                {
                    ProductId = p.Product.Id,
                    Quantity = p.Quantity,
                    Price = p.Product.Price,
                    Name = p.Product.Name,
                    Photo = p.Product.Photos.FirstOrDefault(),
                    Promotion = p.Product.Promotion?.IsCurrentlyActive == true ? p.Product.Promotion.PromotionalPrice : null
                }).ToList() ?? [],
                Errors = errors
            };
        }
    }
}
