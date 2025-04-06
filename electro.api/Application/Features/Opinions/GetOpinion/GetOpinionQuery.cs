using MediatR;

namespace Application.Features.Opinions.GetOpinion
{
    public class GetOpinionQuery : IRequest<GetOpinionResult>
    {
        public Guid Id { get; set; }
    }
}