using MediatR;

namespace Application.Features.Opinions.CreateOpinion
{
    public class CreateOpinionCommand: IRequest<CreateOpinionResult>
    {
        public Guid ProductId { get; set; }
        public string Content { get; set; }
        public float Rating { get; set; }
        public string AuthorDisplayName { get; set; }
    }
}
