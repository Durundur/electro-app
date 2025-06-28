using Domain.Exceptions;

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

        public static AttributeDefinition Create(string name, AttributeType type, bool isRequired, string description, bool isFilterable)
        {
            ValidateName(name);
            ValidateDescription(description);

            return new AttributeDefinition
            {
                Id = Guid.NewGuid(),
                Name = name,
                Type = type,
                IsRequired = isRequired,
                Description = description,
                IsFilterable = isFilterable
            };
        }

        public void Update(string name, AttributeType type, bool isRequired, string description, bool isFilterable)
        {
            ValidateName(name);
            ValidateDescription(description);

            Name = name;
            Type = type;
            IsRequired = isRequired;
            Description = description;
            IsFilterable = isFilterable;
        }

        private static void ValidateName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new DomainException("Name cannot be empty.");
            }

            if (name.Length > 100)
            {
                throw new DomainException("Name cannot exceed 100 characters.");
            }
        }

        private static void ValidateDescription(string description)
        {
            if (description.Length > 500)
            {
                throw new DomainException("Description cannot exceed 500 characters.");
            }
        }
    }
}
