using Domain.Aggregates.ProductHierarchyAggregate;
using Domain.Exceptions;

namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class AttributeValue
    {
        public AttributeDefinition AttributeDefinition { get; private set; }
        public string Value { get; private set; }
        public bool IsPrimary { get; private set; }

        private AttributeValue() { }

        public static AttributeValue Create(AttributeDefinition attributeDefinition, string value, bool isPrimary)
        {
            ValidateAttributeDefinition(attributeDefinition);
            ValidateValue(attributeDefinition, value);

            return new AttributeValue
            {
                AttributeDefinition = attributeDefinition,
                Value = value,
                IsPrimary = isPrimary
            };
        }

        public void Update(string value, bool isPrimary)
        {
            ValidateValue(AttributeDefinition, value);

            Value = value;
            IsPrimary = isPrimary;
        }

        private static void ValidateAttributeDefinition(AttributeDefinition attributeDefinition)
        {
            if (attributeDefinition == null)
            {
                throw new DomainException("AttributeDefinition cannot be null.");
            }
        }

        private static void ValidateValue(AttributeDefinition attributeDefinition, string value)
        {
            if (attributeDefinition.IsRequired && string.IsNullOrWhiteSpace(value))
            {
                throw new DomainException($"Value for attribute '{attributeDefinition.Name}' is required.");
            }

            switch (attributeDefinition.Type)
            {
                case AttributeType.Text:
                    if (value.Length > 100)
                    {
                        throw new DomainException($"Value for attribute '{attributeDefinition.Name}' cannot exceed 100 characters.");
                    }
                    break;

                case AttributeType.Boolean:
                    if (!bool.TryParse(value, out _))
                    {
                        throw new DomainException($"Value for attribute '{attributeDefinition.Name}' must be a valid boolean.");
                    }
                    break;

                case AttributeType.List:
                    break;

                default:
                    throw new DomainException($"Unsupported attribute type: {attributeDefinition.Type}");
            }
        }
    }
}
