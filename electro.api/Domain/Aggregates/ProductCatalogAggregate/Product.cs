using Domain.Aggregates.ProductHierarchyAggregate;
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
        public Group? Group { get; private set; }
        public Category? Category { get; private set; }
        public SubCategory? SubCategory { get; private set; }
        public int StockQuantity { get; private set; }
        private readonly List<AttributeValue> _attributes = new List<AttributeValue>();
        public IReadOnlyCollection<AttributeValue> Attributes => _attributes.AsReadOnly();
        private readonly List<Opinion> _opinions = new List<Opinion>();
        public IReadOnlyCollection<Opinion> Opinions => _opinions.AsReadOnly();
        private readonly List<string> _photos = new List<string>();
        public IReadOnlyCollection<string> Photos => _photos.AsReadOnly();
        public ProductPromotion? Promotion { get; private set; }
        public bool IsVisible => Status == ProductStatus.Active;
        public bool IsAvailableToBuy => Status == ProductStatus.Active && StockQuantity > 0;
        public Money EffectivePrice => Promotion?.IsCurrentlyActive == true ? Promotion.PromotionalPrice : Price;

        private Product() { }

        public static Product Create(string name, string description, Money price, int stockQuantity)
        {
            ValidateName(name);
            ValidatePrice(price);
            ValidateStockQuantity(stockQuantity);

            return new Product
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                Price = price,
                Status = ProductStatus.Draft,
                StockQuantity = stockQuantity
            };
        }

        public void Update(string name, string description, Money price, ProductStatus status, int stockQuantity)
        {
            ValidateName(name);
            ValidatePrice(price);
            ValidateStockQuantity(stockQuantity);

            Name = name;
            Description = description;
            Price = price;
            Status = status;
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

        public OpinionReaction AddOpinionReaction(Guid opinionId, Guid userId, OpinionReactionType reactionType)
        {
            var opinion = _opinions.FirstOrDefault(o => o.Id == opinionId);

            if (opinion == null)
            {
                throw new DomainException($"Opinion with ID {opinionId} not found in product.");
            }

            return opinion.AddReaction(userId, reactionType);
        }

        public void AssignToGroup(Group group)
        {
            Group = group;
        }

        public void AssignToCategory(Category category)
        {
            if (Group == null)
            {
                throw new DomainException("Cannot assign category without assigning group first");
            }

            Category = category;
        }

        public void AssignToSubCategory(SubCategory subCategory)
        {
            if (Category == null || Group == null)
            {
                throw new DomainException("Cannot assign subcategory without assigning category or group first");
            }

            SubCategory = subCategory;
        }

        public void UnassignFromGroup()
        {
            if (Category != null)
            {
                throw new DomainException("Cannot unassign group while product has assigned category");
            }

            Group = null;
        }

        public void UnassignFromCategory()
        {
            if (SubCategory != null)
            {
                throw new DomainException("Cannot unassign category while product has assigned subcategory");
            }

            Category = null;
        }

        public void UnassignFromSubCategory()
        {
            SubCategory = null;
        }

        public void UpdateStockQuantity(int newQuantity)
        {
            if (Status == ProductStatus.Discontinued)
            {
                throw new DomainException("Cannot update stock for discontinued product");
            }

            if (newQuantity < 0)
            {
                throw new DomainException("Stock quantity cannot be negative");
            }

            StockQuantity = newQuantity;
        }

        public void UpdatePhotos(IEnumerable<string> photos)
        {
            if (photos == null)
            {
                throw new DomainException("Photos collection cannot be null.");
            }

            _photos.Clear();
            _photos.AddRange(photos.Where(p => !string.IsNullOrWhiteSpace(p)).Distinct());
        }

        public void UpdateAttributes(IEnumerable<AttributeValue> newAttributes)
        {
            if (newAttributes == null)
            {
                throw new DomainException("Attributes collection cannot be null.");
            }

            var newAttributesList = newAttributes.Where(a => a != null).ToList();

            var attributesToRemove = _attributes
                .Where(existing => !newAttributesList
                    .Any(newAttr => newAttr.AttributeDefinition.Id == existing.AttributeDefinition.Id))
                .ToList();

            foreach (var attributeToRemove in attributesToRemove)
            {
                _attributes.Remove(attributeToRemove);
            }

            foreach (var newAttribute in newAttributesList)
            {
                var existingAttribute = _attributes
                    .FirstOrDefault(a => a.AttributeDefinition.Id == newAttribute.AttributeDefinition.Id);

                if (existingAttribute == null)
                {
                    continue;
                }

                existingAttribute.Update(newAttribute.Value, newAttribute.IsPrimary);
            }
        }

        private void ValidatePromotionalPrice(Money promotionalPrice)
        {
            if (promotionalPrice.Currency != Price.Currency)
            {
                throw new DomainException("Promotional price currency must match product price currency");
            }

            if (promotionalPrice.Amount >= Price.Amount)
            {
                throw new DomainException("Promotional price must be lower than regular price");
            }
        }

        public void CreatePromotion(Money promotionalPrice, DateTime startDate, DateTime endDate, bool isEnabled)
        {
            if (Promotion != null)
            {
                throw new DomainException("Product already has a promotion");
            }

            ValidatePromotionalPrice(promotionalPrice);

            Promotion = ProductPromotion.Create(promotionalPrice, startDate, endDate, isEnabled);
        }

        public void UpdatePromotion(Money promotionalPrice, DateTime startDate, DateTime endDate, bool isActive)
        {
            if (Promotion == null)
            {
                throw new DomainException("Cannot update non-existing promotion");
            }

            ValidatePromotionalPrice(promotionalPrice);

            Promotion.Update(promotionalPrice, startDate, endDate, isActive);
        }

        public void RemovePromotion()
        {
            Promotion = null;
        }

        private static void ValidateName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new DomainException("Product name cannot be empty.");
            }

            if (name.Length > 200)
            {
                throw new DomainException("Product name cannot exceed 200 characters.");
            }
        }

        private static void ValidatePrice(Money price)
        {
            if (price == null)
            {
                throw new DomainException("Product price cannot be null.");
            }
        }

        private static void ValidateStockQuantity(int stockQuantity)
        {
            if (stockQuantity < 0)
            {
                throw new DomainException("Stock quantity cannot be negative.");
            }
        }
    }
}
