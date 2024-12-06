namespace Domain.Aggregates.ProductHierarchyAggregate
{
    public class AttributeDefinition
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public AttributeType Type { get; private set; }
        public bool IsRequired { get; private set; }
        public string Description { get; private set; }

        public AttributeDefinition(string name, AttributeType type, bool isRequired, string description)
        {
            Name = name;
            Type = type;
            IsRequired = isRequired;
            Description = description;
        }

        public void Update(string name, AttributeType type, bool isRequired, string description)
        {
            Name = name;
            Type = type;
            IsRequired = isRequired;
            Description = description;
        }
    }

    public enum AttributeType
    {
        String,
        Integer,
        Decimal,
        Boolean
    }
}
