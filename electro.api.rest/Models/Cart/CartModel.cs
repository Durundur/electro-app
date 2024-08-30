using electro.api.rest.Models.Auth;
using electro.api.rest.Models.Price;

namespace electro.api.rest.Models.Cart
{
    public class CartModel : BaseModel
    {
        public UserModel User { get; set; }
        public Guid UserId { get; set; }
        public int ProductsCount { get; set; }
        public PriceBase TotalPrice { get; set; }
        public IEnumerable<CartProductModel> Products { get; set; }
    }
}
