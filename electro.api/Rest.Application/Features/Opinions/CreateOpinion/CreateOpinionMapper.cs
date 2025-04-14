namespace Rest.Application.Features.Opinions.CreateOpinion
{
    public static class CreateOpinionMapper
    {
        public static CreateOpinionResult MapToCreateOpinionResult(Domain.Aggregates.ProductCatalogAggregate.Opinion opinion)
        {
            return new CreateOpinionResult
            {
                Id = opinion.Id,
                Content = opinion.Content,
                AuthorDisplayName = opinion.AuthorDisplayName,
                Rating = opinion.Rating,
                CreatedAt = opinion.CreatedAt,
            };
        }
    }
}
