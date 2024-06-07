using electro.api.rest.Models;

namespace electro.api.rest.Dtos
{
    public class OpinionDto
    {
        public Guid? Id { get; set; }
        public string Review { get; set; }
        public string AuthorDisplayName { get; set; }
        public int? Likes { get; set; }
        public int? Dislikes { get; set; }
        public float Rating { get; set; }
        public Guid ProductId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
