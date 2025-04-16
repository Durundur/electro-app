namespace Application.Services.Models
{
    public class ProductAttributeModel
    {
        public Guid Id { get; set; }
        public string Value { get; set; }
        public bool IsPrimary { get; set; }
    }
}
