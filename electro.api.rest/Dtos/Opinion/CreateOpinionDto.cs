namespace electro.api.rest.DTOs.Opinion
{
    public class CreateOpinionDto
    {
        public Guid ProductId {  get; set; }
        public string AuthorDisplayName { get; set; }
        public string Review { get; set; }
        public decimal Rating { get; set; }
    }
}
