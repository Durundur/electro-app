using Domain.Aggregates.ProductHierarchyAggregate;

namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class AttributeValue
    {
        public AttributeDefinition AttributeDefinition { get; private set; }
        public string Value { get; private set; }
        public bool IsPrimary { get; private set; }

        private AttributeValue() { }

        public AttributeValue(AttributeDefinition attributeDefinition, string value, bool isPrimary)
        {
            AttributeDefinition = attributeDefinition;
            Value = value;
            IsPrimary = isPrimary;
        }

        public void Update(string value, bool isPrimary)
        {
            Value = value;
            IsPrimary = isPrimary;
        }
    }
}
