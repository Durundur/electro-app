using MediatR;

namespace Application.Features.Opinions.GetProductOpinionsStats
{
    public class GetProductOpinionsStatsQuery : IRequest<GetProductOpinionsStatsResult>
    {
        public Guid ProductId { get; init; }
    }
}