using Application.Exceptions;
using Application.Services.OpinionService;
using MediatR;

namespace Rest.Application.Features.Opinions.GetProductOpinionsStats
{
    public class GetProductOpinionsStatsHandler : IRequestHandler<GetProductOpinionsStatsQuery, GetProductOpinionsStatsResult>
    {
        private readonly IOpinionService _opinionService;

        public GetProductOpinionsStatsHandler(IOpinionService opinionService)
        {
            _opinionService = opinionService;
        }

        public async Task<GetProductOpinionsStatsResult> Handle(GetProductOpinionsStatsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var stats = await _opinionService.GetProductOpinionsStatsAsync(request.ProductId, cancellationToken);

                return new GetProductOpinionsStatsResult
                {
                    Stats = stats
                };
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get product opinions stats", ex);
            }
        }
    }
}