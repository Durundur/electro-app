namespace Domain.ValueObjects
{
    public class MoneyWithDiscount: Money
    {
        
        public decimal OldAmount { get; set; }

        public MoneyWithDiscount(decimal amount, string currency, decimal oldAmount) : base(amount, currency)
        {
            OldAmount = oldAmount;
        }
    }
}
