using D = Domain.Aggregates;

namespace Rest.Application.Features.Cart.GetCart
{
    public static class GetCartMapper
    {
        public static GetCartResult MapToGetCartResult(D.CartAggregate.Cart cart)
        {
            return new GetCartResult
            {
                Id = cart.Id,
                TotalQuantity = cart.Products.Sum(p => p.Quantity),
                TotalPrice = cart.TotalPrice,
                Products = cart.Products.Select(cp => new GetCartResultProduct
                {
                    Name = cp.Product.Name,
                    ProductId = cp.Product.Id,
                    Photo = cp?.Product.Photos.FirstOrDefault(),
                    Price = cp.Product.Price,
                    Quantity = cp.Quantity,
                    Promotion = cp?.Product?.Promotion?.IsCurrentlyActive == true ? cp.Product.Promotion.PromotionalPrice : null,
                }).ToList()
            };
        }
    }
}

