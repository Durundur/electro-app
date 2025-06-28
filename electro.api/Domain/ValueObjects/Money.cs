using Domain.Exceptions;

namespace Domain.ValueObjects
{
    public class Money
    {
        private static readonly HashSet<string> Currencies = new HashSet<string> { "PLN", "EUR", "USD", "GBP" };
        public decimal Amount { get; private set; }
        public string Currency { get; private set; }

        public Money(decimal amount, string currency)
        {
            if (amount < 0)
            {
                throw new DomainException("Amount cannot be negative");
            }

            if (!Currencies.Contains(currency) || string.IsNullOrWhiteSpace(currency))
            {
                throw new DomainException("Invalid currency");
            }
            
            Amount = amount;
            Currency = currency;
        }

        public static Money Zero(string currency)
        {
            return new Money(0, currency);
        }
    }
}
