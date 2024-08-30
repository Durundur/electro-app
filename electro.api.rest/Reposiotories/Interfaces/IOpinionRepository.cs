using electro.api.rest.DTOs.Opinion;
using electro.api.rest.Models.Opinion;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IOpinionRepository
    {
        Task<OpinionModel> CreateOpinionAsync(OpinionModel opinion);
        Task<OpinionModel> RateOpinionAsync(Guid  opinionId, Guid userId, OpinionActionType actionType);
        IQueryable<OpinionModel> GetOpinions(Guid prodcutId);
        Task<IEnumerable<OpinionsStats>> GetOpinionsStatsAsync(Guid productId);
    }
}
