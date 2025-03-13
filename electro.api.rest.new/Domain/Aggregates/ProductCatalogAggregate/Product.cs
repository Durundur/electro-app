using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class Product
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public Money Price { get; private set; }
        public ProductStatus Status { get; private set; }
        public int? GroupId { get; private set; }
        public int? CategoryId { get; private set; }
        public int? SubCategoryId { get; private set; }
        public bool Active { get; private set; }
        public int StockQuantity { get; private set; }
        private readonly List<AttributeValue> _attributes = new List<AttributeValue>();
        public IReadOnlyCollection<AttributeValue> Attributes => _attributes.AsReadOnly();
        private readonly List<Opinion> _opinions = new List<Opinion>();
        public IReadOnlyCollection<Opinion> Opinions => _opinions.AsReadOnly();
        private readonly List<string> _photos = new List<string>();
        public IReadOnlyCollection<string> Photos => _photos.AsReadOnly();

        private Product()
        {
            _attributes = new List<AttributeValue>();
            _opinions = new List<Opinion>();
            _photos = new List<string>();
        }

        public static Product Create(
            string name, 
            string description, 
            Money price, 
            bool active, 
            int stockQuantity)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new DomainException("Product name cannot be empty");
                
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                Price = price,
                Status = ProductStatus.Active,
                Active = active,
                StockQuantity = stockQuantity
            };

            return product;
        }

        public void Update(string name, string description, Money price, ProductStatus status, bool active, int stockQuantity)
        {
            Name = name;
            Description = description;
            Price = price;
            Status = status;
            Active = active;
            StockQuantity = stockQuantity;
        }

        public Opinion AddOpinion(Guid userId, string content, float rating, string authorDisplayName)
        {
            if (_opinions.Any(o => o.UserId == userId))
            {
                throw new DomainException("User has already added an opinion to this product.");
            }
            
            var opinion = Opinion.Create(userId, content, rating, authorDisplayName);
            _opinions.Add(opinion);
            return opinion;
        }

        public void AssignToGroup(int groupId)
        {
            if(groupId == 0)
            {
                GroupId = null;
            }
            else
            {
                GroupId = groupId;
            }
        }

        public void AssignToCategory(int categoryId)
        {
            if(categoryId == 0)
            {
                CategoryId = null;
            }
            else
            {
                CategoryId = categoryId;
            }
            
        }

        public void AssignToSubCategory(int subCategoryId)
        {
            if (subCategoryId == 0)
            {
                SubCategoryId = null;
            }
            else
            {
                SubCategoryId = subCategoryId;
            }
        }
        public void UpdateStockQuantity(int newStockQuantity)
        {
            if (newStockQuantity < 0) throw new InvalidOperationException("Stock Quantity cannot be lower than 0.");
            StockQuantity = newStockQuantity;
        }

        public void ReplacePhotos(IEnumerable<string> photos)
        {
            if (photos == null)
                throw new ArgumentNullException(nameof(photos), "Photos collection cannot be null.");

            _photos.Clear();
            _photos.AddRange(photos.Where(p => !string.IsNullOrWhiteSpace(p)).Distinct());
        }

        public void AddOrUpdateAttribute(AttributeValue attributeValue)
        {
            if (attributeValue == null)
                throw new ArgumentNullException(nameof(attributeValue), "Attribute value cannot be null.");

            var existingAttribute = _attributes.FirstOrDefault(a => a.AttributeDefinitionId == attributeValue.AttributeDefinitionId);
            if (existingAttribute != null)
            {
                existingAttribute.Update(attributeValue.Value, attributeValue.IsPrimary);
            }
            else
            {
                _attributes.Add(attributeValue);
            }
        }

        public void RemoveAttribute(Guid definitionId)
        {
            var attribute = _attributes.FirstOrDefault(a => a.AttributeDefinitionId == definitionId);
            if (attribute == null)
                throw new InvalidOperationException("Attribute not found.");

            _attributes.Remove(attribute);
        }

        public void ReplaceAttributes(IEnumerable<AttributeValue> newAttributes)
        {
            if (newAttributes == null)
                throw new ArgumentNullException(nameof(newAttributes), "Attributes collection cannot be null.");

            _attributes.Clear();
            _attributes.AddRange(newAttributes.Where(a => a != null));
        }

    }
}
