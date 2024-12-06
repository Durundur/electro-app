using MediatR;

namespace Application.Features.ProductCatalog.CreateProduct
{
    public class CreateOrUpdateProductCommand: IRequest<CreateOrUpdateProductResult>
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public IList<string> Photos { get; set; }
        public bool Active { get; set; }
        public int StockQuantity { get; set; }
        public string Status { get; set; }
        public int? GroupId { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public IList<CreateOrUpdateProductCommandAttributeDefinitionValue> Attributes { get; set; }
    }

    public class CreateOrUpdateProductCommandAttributeDefinitionValue
    {
        public Guid Id { get; set; }
        public string Value { get; set; }
        public bool IsPrimary { get; set; }
    }
}
