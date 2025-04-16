namespace Domain.Aggregates.ProductHierarchyAggregate
{
    public class AttributeDefinition
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public AttributeType Type { get; private set; }
        public bool IsRequired { get; private set; }
        public bool IsFilterable { get; private set; }
        public string Description { get; private set; }

        private AttributeDefinition() { }

        public AttributeDefinition(string name, AttributeType type, bool isRequired, string description, bool isFilterable)
        {
            Name = name;
            Type = type;
            IsRequired = isRequired;
            Description = description;
            IsFilterable = isFilterable;
        }

        public void Update(string name, AttributeType type, bool isRequired, string description, bool isFilterable)
        {
            Name = name;
            Type = type;
            IsRequired = isRequired;
            Description = description;
            IsFilterable = isFilterable;
        }
    }

    public enum AttributeType
    {
        Text,
        List,
        Boolean
    }
}
