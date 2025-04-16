namespace Application.Services.Models
{
    public class OpinionModel
    {
        public Guid ProductId { get; set; }
        public string Content { get; set; }
        public float Rating { get; set; }
        public string AuthorDisplayName { get; set; }
    }
}
