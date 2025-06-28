using Domain.Exceptions;

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

        private readonly List<Category> _categories = new List<Category>();
        public IReadOnlyCollection<Category> Categories => _categories.AsReadOnly();

        private readonly List<AttributeDefinition> _attributes = new List<AttributeDefinition>();
        public IReadOnlyCollection<AttributeDefinition> Attributes => _attributes.AsReadOnly();

        private Group() { }

        public static Group Create(string name, string photo, string icon, string description, bool active, int displayOrder)
        {
            ValidateName(name);
            ValidateDescription(description);
            ValidateDisplayOrder(displayOrder);

            return new Group
            {
                Name = name,
                Photo = photo,
                Icon = icon,
                Description = description,
                Active = active,
                DisplayOrder = displayOrder,
                CreatedAt = DateTime.UtcNow,
                ModifiedAt = DateTime.UtcNow,
            };
        }

        public void Update(string name, string photo, string icon, string description, bool active, int displayOrder)
        {
            ValidateName(name);
            ValidateDescription(description);
            ValidateDisplayOrder(displayOrder);

            Name = name;
            Photo = photo;
            Icon = icon;
            Description = description;
            Active = active;
            DisplayOrder = displayOrder;
            ModifiedAt = DateTime.UtcNow;
        }

        public void AddAttribute(AttributeDefinition attribute)
        {
            if (_attributes.Any(a => a.Name == attribute.Name && a.Id == attribute.Id))
            {
                throw new DomainException("Attribute with this name already exists");
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

        public void AddCategory(Category category)
        {
            if (_categories.Any(c => c.Id == category.Id))
            {
                throw new DomainException("Category is already assigned to this group.");
            }
                
            category.AssignToGroup(this.Id);
            _categories.Add(category);
        }

        public void RemoveCategory(Category category)
        {
            if (_categories.Contains(category))
            {
                category.AssignToGroup(null);
                _categories.Remove(category);
            }
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

        private static void ValidateDisplayOrder(int displayOrder)
        {
            if (displayOrder < 0)
            {
                throw new DomainException("DisplayOrder cannot be negative.");
            }

            if (displayOrder > 100) 
            {
                throw new DomainException("DisplayOrder cannot exceed 100.");
            }
        }
    }
}
