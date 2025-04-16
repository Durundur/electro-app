namespace Application.Services.Models
{
    public class ProductPromotionModel
    {
        public decimal PromotionAmount { get; set; }
        public string PromotionCurrency { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
