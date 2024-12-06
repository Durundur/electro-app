namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class AttributeValue
    {
        public Guid AttributeDefinitionId { get; private set; }
        public string Value { get; private set; }
        public bool IsPrimary { get; private set; }

        public AttributeValue(Guid attributeDefinitionId, string value, bool isPrimary)
        {
            AttributeDefinitionId = attributeDefinitionId;
            Value = value;
            IsPrimary = isPrimary;
        }

        public void Update(string newValue, bool isPrimary)
        {
            Value = newValue;
            IsPrimary = isPrimary;
        }
    }
}
