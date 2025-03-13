using Application.Exceptions;
using Domain.Reposiotories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Opinions.GetProductOpinionsStats
{
    public class GetProductOpinionsStatsHandler : IRequestHandler<GetProductOpinionsStatsQuery, GetProductOpinionsStatsResult>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetProductOpinionsStatsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetProductOpinionsStatsResult> Handle(GetProductOpinionsStatsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var opinions = await _unitOfWork.OpinionRepository
                    .GetProductOpinionsQuery(request.ProductId)
                    .ToListAsync(cancellationToken);

                var grouped = opinions
                    .GroupBy(o => (int)Math.Ceiling(o.Rating))
                    .ToDictionary(g => g.Key, g => g.Count());

                var stats = Enumerable.Range(1, 5)
                    .Select(rating => new OpinionsStatsItem
                    {
                        Rating = rating,
                        Count = grouped.ContainsKey(rating) ? grouped[rating] : 0
                    })
                    .ToList();

                return new GetProductOpinionsStatsResult
                {
                    Stats = stats
                };
            }
            catch (Exception ex)
            {
                throw new BadRequestException(ex.Message);
            }
        }
    }
}