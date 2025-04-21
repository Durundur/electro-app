using Domain.Aggregates.ProductCatalogAggregate;

namespace Graphql.Application.Mutations.Inputs
{
    public class CreateOrUpdateProductInput
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public IList<string> Photos { get; set; }
        public int StockQuantityDelta { get; set; }
        public ProductStatus Status { get; set; }
        public int? GroupId { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public IList<CreateOrUpdateProductAttributeInput> Attributes { get; set; }
        public CreateOrUpdateProductPromotionInput? Promotion { get; set; }
    }

    public class CreateOrUpdateProductAttributeInput
    {
        public Guid Id { get; set; }
        public string Value { get; set; }
        public bool IsPrimary { get; set; }
    }

    public class CreateOrUpdateProductPromotionInput
    {
        public decimal PromotionAmount { get; set; }
        public string PromotionCurrency { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
