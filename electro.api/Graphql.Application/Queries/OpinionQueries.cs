using Application.Exceptions;
using Application.Services.Models;
using Application.Services.OpinionService;
using Application.Shared.Pagination;
using Domain.Aggregates.ProductCatalogAggregate;
using HotChocolate;

namespace Graphql.Application.Queries
{
    public partial class Query
    {
        public async Task<PaginatedResult<Opinion>> GetProductOpinions([Service] IOpinionService opinionService, Guid productId, int? rating, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            try
            {
                var (opinions, totalOpinions) = await opinionService.GetProductOpinionsAsync(productId, page, pageSize, rating, cancellationToken);

                return new PaginatedResult<Opinion>(opinions, totalOpinions, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get product opinions", ex);
            }
        }

        public async Task<List<OpinionsStats>> GetProductOpinionsStats([Service] IOpinionService opinionService, Guid productId, CancellationToken cancellationToken)
        {
            try
            {
                var stats = await opinionService.GetProductOpinionsStatsAsync(productId, cancellationToken);

                return stats;
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get product opinions stats", ex);
            }
        }
    }
}
