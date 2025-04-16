using Application.Services.Models;

namespace Rest.Application.Features.Opinions.GetProductOpinionsStats
{
    public class GetProductOpinionsStatsResult
    {
        public IList<OpinionsStats> Stats { get; set; }
    }
}
