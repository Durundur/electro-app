using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Aggregates.ProductCatalogAggregate
{
    public class ProductPromotion
    {
        public Guid Id { get; private set; }
        public Money PromotionalPrice { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public bool IsEnabled { get; private set; }
        public bool IsCurrentlyActive => IsEnabled && DateTime.UtcNow >= StartDate && DateTime.UtcNow <= EndDate;

        private ProductPromotion() { }

        public static ProductPromotion Create(Money promotionalPrice, DateTime startDate, DateTime endDate, bool isEnabled)
        {
            ValidatePromotionalPrice(promotionalPrice);
            ValidateDates(startDate, endDate);

            return new ProductPromotion
            {
                Id = Guid.NewGuid(),
                PromotionalPrice = promotionalPrice,
                StartDate = startDate,
                EndDate = endDate,
                IsEnabled = isEnabled,
            };
        }

        public void Update(Money promotionalPrice, DateTime startDate, DateTime endDate, bool isEnabled)
        {
            ValidatePromotionalPrice(promotionalPrice);
            ValidateDates(startDate, endDate);

            PromotionalPrice = promotionalPrice;
            StartDate = startDate;
            EndDate = endDate;
            IsEnabled = isEnabled;
        }

        private static void ValidatePromotionalPrice(Money promotionalPrice)
        {
            if (promotionalPrice == null)
            {
                throw new DomainException("Promotional price cannot be null.");
            }
        }

        private static void ValidateDates(DateTime startDate, DateTime endDate)
        {
            if (endDate <= startDate)
            {
                throw new DomainException("End date must be greater than start date.");
            }

            if (startDate < DateTime.UtcNow.Date)
            {
                throw new DomainException("Start date cannot be in the past.");
            }
        }
    }
}