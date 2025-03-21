namespace Application.Features.ProductCatalog.GetPromotionHighlight
{
    public class GetPromotionHighlightResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Photo { get; set; }
    }
}