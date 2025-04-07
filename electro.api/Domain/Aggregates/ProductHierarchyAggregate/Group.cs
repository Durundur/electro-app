namespace Domain.Aggregates.ProductHierarchyAggregate
{
    public class Group
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Photo { get; private set; }
        public string Icon { get; private set; }
        public string Description { get; private set; }
        public bool Active { get; private set; }
        public int DisplayOrder { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime ModifiedAt { get; private set; }

        private readonly List<Category> _categories;
        public IReadOnlyCollection<Category> Categories => _categories.AsReadOnly();

        private readonly List<AttributeDefinition> _attributes;
        public IReadOnlyCollection<AttributeDefinition> Attributes => _attributes.AsReadOnly();

        public Group(string name, string photo, string icon, string description, bool active, int displayOrder)
        {
            Name = name;
            Photo = photo;
            Icon = icon;
            Description = description;
            Active = active;
            DisplayOrder = displayOrder;
            CreatedAt = DateTime.UtcNow;
            ModifiedAt = DateTime.UtcNow;
            _categories = new List<Category>();
            _attributes = new List<AttributeDefinition>();
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

        public void Update(string name, string photo, string icon, string description, bool active, int displayOrder)
        {
            Name = name;
            Photo = photo;
            Icon = icon;
            Description = description;
            Active = active;
            DisplayOrder = displayOrder;
            ModifiedAt = DateTime.UtcNow;
        }
    }
}
