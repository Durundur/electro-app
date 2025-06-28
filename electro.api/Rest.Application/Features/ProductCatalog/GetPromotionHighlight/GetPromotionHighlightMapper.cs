namespace Rest.Application.Features.ProductCatalog.GetPromotionHighlight
{
    public static class GetPromotionHighlightMapper
    {
        public static GetPromotionHighlightResult MapToGetPromotionHighlightResult(Domain.Aggregates.ProductCatalogAggregate.Product product)
        {

            return new GetPromotionHighlightResult()
            {
                Id = product.Id,
                Name = product.Name,
                Amount = product.Price.Amount,
                Currency = product.Price.Currency,
                Photo = product.Photos.FirstOrDefault(),
                Promotion = product.EffectivePrice,
            };
        }
    }
}