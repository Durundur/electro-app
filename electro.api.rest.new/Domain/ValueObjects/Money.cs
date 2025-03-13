
namespace Domain.ValueObjects
{
    public class Money
    {
        public decimal Amount { get; private set; }
        public string Currency { get; private set; }

        public Money(decimal amount, string currency) 
        {
            Amount = amount;
            Currency = currency;
        }

        public static Money Zero(string currency)
        {
            return new Money(0, currency);
        }
    }
}
