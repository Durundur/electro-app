namespace electro.api.rest.Models.Price
{
    public class PriceBase
    {
        public string Currency { get; set; }
        public decimal Value { get; set; }

        public PriceBase() 
        {
            Currency = "PLN";
            Value = 0;
        }

        public PriceBase(decimal Value, string Currency)
        {
            this.Currency = Currency;
            this.Value = Value;
        }
    }
}
