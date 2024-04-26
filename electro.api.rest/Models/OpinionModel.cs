namespace electro.api.rest.Models
{
    public class OpinionModel : BaseModel
    {
        public string Review { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public bool IsVerifiedPurchase { get; set; }
        public float Rating { get; set; }
        public ProductModel Product { get; set; }
    }
}
