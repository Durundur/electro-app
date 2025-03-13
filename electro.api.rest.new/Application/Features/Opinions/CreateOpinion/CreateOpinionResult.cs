namespace Application.Features.Opinions.CreateOpinion
{
    public class CreateOpinionResult
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public float Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public string AuthorDisplayName { get; set; }
    }
}
