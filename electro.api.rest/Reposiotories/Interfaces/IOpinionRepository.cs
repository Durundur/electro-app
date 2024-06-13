using electro.api.rest.Dtos;
using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IOpinionRepository
    {
        Task<OpinionModel> CreateOpinionAsync(OpinionModel opinion);
        Task<OpinionModel> RateOpinionAsync(Guid  opinionId, Guid userId, OpinionActionType actionType);
        Task<IEnumerable<OpinionModel>> GetOpinionsByRatingAsync(Guid prodcutId, int rating);
        Task<IEnumerable<OpinionsStats>> GetOpinionsStatsAsync(Guid productId);
    }
}
