using electro.api.rest.Models.Auth;
using electro.api.rest.Models.Product;

namespace electro.api.rest.Models.Opinion
{
    public class OpinionModel : BaseModel
    {
        public string Review { get; set; }
        public string AuthorDisplayName { get; set; }
        public Guid UserId { get; set; }
        public UserModel User { get; set; }
        public int Likes { get; set; } = 0;
        public int Dislikes { get; set; } = 0;
        public float Rating { get; set; } = 0;
        public Guid ProductId { get; set; }
        public ProductModel Product { get; set; }
        public IList<OpinionActionModel> OpinionsActions { get; set; } = new List<OpinionActionModel>();
    }
}
