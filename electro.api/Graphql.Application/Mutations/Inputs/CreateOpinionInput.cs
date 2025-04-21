namespace Graphql.Application.Mutations.Inputs
{
    public class CreateOpinionInput
    {
        public Guid ProductId { get; set; }
        public string Content { get; set; }
        public float Rating { get; set; }
        public string AuthorDisplayName { get; set; }
    }
}
