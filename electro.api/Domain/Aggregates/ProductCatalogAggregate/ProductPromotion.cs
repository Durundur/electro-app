using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class ProductPromotion
    {
        public Guid Id { get; private set; }
        public Guid ProductId { get; private set; }
        public Money PromotionalPrice { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public bool IsActive { get; private set; }

        private ProductPromotion() { }

        public static ProductPromotion Create(Guid productId, Money promotionalPrice, DateTime startDate, DateTime endDate, bool isActive)
        {
            if (endDate <= startDate)
            {
                throw new DomainException("End date must be greater than start date");
            }

            return new ProductPromotion
            {
                Id = Guid.NewGuid(),
                ProductId = productId,
                PromotionalPrice = promotionalPrice,
                StartDate = startDate,
                EndDate = endDate,
                IsActive = isActive,
            };
        }

        public void Update(Money promotionalPrice, DateTime startDate, DateTime endDate, bool isActive)
        {
            if (endDate <= startDate)
            {
                throw new DomainException("End date must be greater than start date");
            }

            PromotionalPrice = promotionalPrice;
            StartDate = startDate;
            EndDate = endDate;
            IsActive = isActive;
        }

        public bool IsValid()
        {
            var now = DateTime.UtcNow;
            return IsActive && now >= StartDate && now <= EndDate;
        }
    }
}