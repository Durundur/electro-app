namespace electro.api.rest.DTOs.Opinion
{
    public class OpinionsStats
    {
        public int Rating { get; set; }
        public int Count { get; set; }

        public OpinionsStats(int rating)
        {
            Rating = rating;
            Count = 0;
        }
    }
}
