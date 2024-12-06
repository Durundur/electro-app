using Domain.Aggregates.ProductHierarchyAggregate;
using Domain.ValueObjects;

namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class Product
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public Money Price { get; private set; }
        public ProductStatus Status{ get; set; }
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

        public Product() { }

        public Product(string name, string description, Money price, ProductStatus status, bool active, int stockQuantity)
        {
            Name = name;
            Description = description;
            Price = price;
            Status = status;
            Active = active;
            StockQuantity = stockQuantity;
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

        public void AddOpinion(Guid userProfileId, string content, int rating)
        {
            var opinion = new Opinion(userProfileId, content, rating);
            _opinions.Add(opinion);
        }

        public void AddOpinionAction(Guid opinionId, Guid userProfileId, OpinionActionType actionType)
        {
            var opinion = _opinions.FirstOrDefault(o => o.Id == opinionId);
            if (opinion == null)
                throw new InvalidOperationException("Opinion not found");

            opinion.AddAction(userProfileId, actionType);
        }

        public void UpdatePrice(Money newPrice)
        {
            Price = newPrice;
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
        public void AddPhoto(string photo)
        {
            if (string.IsNullOrWhiteSpace(photo))
                throw new ArgumentNullException(nameof(photo), "Photo cannot be null or empty.");

            if (_photos.Contains(photo))
                throw new InvalidOperationException("Photo already exists.");

            _photos.Add(photo);
        }

        public void RemovePhoto(string photo)
        {
            if (string.IsNullOrWhiteSpace(photo))
                throw new ArgumentNullException(nameof(photo), "Photo cannot be null or empty.");

            if (!_photos.Contains(photo))
                throw new InvalidOperationException("Photo not found.");

            _photos.Remove(photo);
        }

        public void ReplacePhotos(IEnumerable<string> photos)
        {
            if (photos == null)
                throw new ArgumentNullException(nameof(photos), "Photos collection cannot be null.");

            _photos.Clear();
            _photos.AddRange(photos.Where(p => !string.IsNullOrWhiteSpace(p)).Distinct());
        }

        public void UpdateStatus(ProductStatus newStatus)
        {
            Status = newStatus;
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
