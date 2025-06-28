using Domain.Exceptions;

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
        private readonly List<SubCategory> _subCategories = new List<SubCategory>();
        public IReadOnlyCollection<SubCategory> SubCategories => _subCategories.AsReadOnly();

        private readonly List<AttributeDefinition> _attributes = new List<AttributeDefinition>();
        public IReadOnlyCollection<AttributeDefinition> Attributes => _attributes.AsReadOnly();

        private Category() { }

        public static Category Create(string name, string description, bool active, int displayOrder)
        {
            ValidateName(name);
            ValidateDescription(description);
            ValidateDisplayOrder(displayOrder);

            return new Category
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
            ValidateName(name);
            ValidateDescription(description);
            ValidateDisplayOrder(displayOrder);

            Name = name;
            Description = description;
            Active = active;
            DisplayOrder = displayOrder;
            ModifiedAt = DateTime.UtcNow;
        }

        public void AssignToGroup(int? groupId)
        {
            GroupId = groupId;
            ModifiedAt = DateTime.UtcNow;
        }

        public void AddSubCategory(SubCategory subCategory)
        {
            if (_subCategories.Any(sc => sc.Id == subCategory.Id))
            {
                throw new DomainException("SubCategory is already assigned to this category.");
            }

            subCategory.AssignToCategory(this.Id);
            _subCategories.Add(subCategory);
        }

        public void RemoveSubCategory(SubCategory subCategory)
        {
            if (!_subCategories.Contains(subCategory))
            {
                throw new DomainException("SubCategory is not assigned to this category.");
            }

            subCategory.AssignToCategory(null);
            _subCategories.Remove(subCategory);
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
