namespace electro.api.rest.Models.Price
{
    public class ProductPrice: PriceBase
    {
        public decimal? OldPriceValue { get; set; }

        public ProductPrice(decimal Value, string Currency, decimal? OldPriceValue) : base(Value, Currency)
        {
            this.OldPriceValue = OldPriceValue;
        }
    }
}
