namespace Domain.Aggregates.ProductHierarchyAggregate
{
    public class SubCategory
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public bool Active { get; private set; }
        public int DisplayOrder { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime ModifiedAt { get; private set; }
        public int? CategoryId { get; private set; }
        private readonly List<AttributeDefinition> _attributes = new List<AttributeDefinition>();
        public IReadOnlyCollection<AttributeDefinition> Attributes => _attributes.AsReadOnly();

        private SubCategory() { }

        public static SubCategory Create(string name, string description, bool active, int displayOrder)
        {
            return new SubCategory
            {
                Name = name,
                Description = description,
                Active = active,
                DisplayOrder = displayOrder,
                CreatedAt = DateTime.UtcNow,
                ModifiedAt = DateTime.UtcNow,
            };
        }

        public void Update(string name, string description, bool active, int displayOrder)
        {
            Name = name;
            Description = description;
            Active = active;
            DisplayOrder = displayOrder;
            ModifiedAt = DateTime.UtcNow;
        }

        public void AssignToCategory(int categoryId)
        {
            CategoryId = categoryId;
            ModifiedAt = DateTime.UtcNow;
        }

        public void AddAttribute(AttributeDefinition attribute)
        {
            if (_attributes.Any(a => a.Name == attribute.Name && a.Id == attribute.Id))
            {
                throw new Exception("Attribute with this name already exists");
            }

            _attributes.Add(attribute);
        }

        public void RemoveAttribute(AttributeDefinition attribute)
        {
            if (_attributes.Contains(attribute))
            {
                _attributes.Remove(attribute);
            }
        }
    }
}
