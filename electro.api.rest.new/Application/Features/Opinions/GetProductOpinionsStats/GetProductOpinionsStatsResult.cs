
namespace Application.Features.Opinions.GetProductOpinionsStats
{
    public class GetProductOpinionsStatsResult
    {
        public IList<OpinionsStatsItem> Stats { get; set; }
    }

    public class OpinionsStatsItem
    {
        public int Rating { get; set; }
        public int Count { get; set; }
    }
}
