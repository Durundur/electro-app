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
        public int StockQuantity { get; private set; }
        private readonly List<AttributeValue> _attributes = new List<AttributeValue>();
        public IReadOnlyCollection<AttributeValue> Attributes => _attributes.AsReadOnly();
        private readonly List<Opinion> _opinions = new List<Opinion>();
        public IReadOnlyCollection<Opinion> Opinions => _opinions.AsReadOnly();
        private readonly List<string> _photos = new List<string>();
        public IReadOnlyCollection<string> Photos => _photos.AsReadOnly();
        public ProductPromotion? Promotion { get; private set; }

        private Product()
        {
            _attributes = new List<AttributeValue>();
            _opinions = new List<Opinion>();
            _photos = new List<string>();
        }

        public static Product Create(string name, string description, Money price, int stockQuantity)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new DomainException("Product name cannot be empty");
            }

            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                Price = price,
                Status = ProductStatus.Draft,
                StockQuantity = stockQuantity
            };

            return product;
        }

        public void Update(string name, string description, Money price, ProductStatus status, int stockQuantity)
        {
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

        public void AssignToGroup(int? groupId)
        {
            if (!groupId.HasValue)
            {
                GroupId = null;
                CategoryId = null;
                SubCategoryId = null;
                return;
            }

            GroupId = groupId.Value;
        }

        public void AssignToCategory(int? categoryId)
        {
            if (!categoryId.HasValue)
            {
                CategoryId = null;
                SubCategoryId = null;
                return;
            }

            if (!GroupId.HasValue)
            {
                throw new DomainException("Cannot assign category without assigning group first");
            }

            CategoryId = categoryId.Value;
        }

        public void AssignToSubCategory(int? subCategoryId)
        {
            if (!subCategoryId.HasValue)
            {
                SubCategoryId = null;
                return;
            }

            if (!CategoryId.HasValue)
            {
                throw new DomainException("Cannot assign subcategory without assigning category first");
            }

            SubCategoryId = subCategoryId.Value;
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

            _attributes.Clear();
            _attributes.AddRange(newAttributes.Where(a => a != null));
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

        public void CreatePromotion(Money promotionalPrice, DateTime startDate, DateTime endDate, bool isActive)
        {
            if (Promotion != null)
            {
                throw new DomainException("Product already has a promotion");
            }

            ValidatePromotionalPrice(promotionalPrice);
            Promotion = ProductPromotion.Create(promotionalPrice, startDate, endDate, isActive);
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
    }
}
