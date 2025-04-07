namespace Domain.Aggregates.ProductHierarchyAggregate
{
    public class Category
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public bool Active { get; private set; }
        public int DisplayOrder { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime ModifiedAt { get; private set; }
        public int? GroupId { get; private set; }
        private readonly List<SubCategory> _subCategories;
        public IReadOnlyCollection<SubCategory> SubCategories => _subCategories.AsReadOnly();

        private readonly List<AttributeDefinition> _attributes;
        public IReadOnlyCollection<AttributeDefinition> Attributes => _attributes.AsReadOnly();

        public Category(string name, string description, bool active, int displayOrder)
        {
            Name = name;
            Description = description;
            Active = active;
            DisplayOrder = displayOrder;
            CreatedAt = DateTime.UtcNow;
            ModifiedAt = DateTime.UtcNow;
            _attributes = new List<AttributeDefinition>();
        }

        public void Update(string name, string description, bool active, int displayOrder)
        {
            Name = name;
            Description = description;
            Active = active;
            DisplayOrder = displayOrder;
            ModifiedAt = DateTime.UtcNow;
        }

        public void AssignToGroup(int groupId)
        {
            GroupId = groupId;
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
