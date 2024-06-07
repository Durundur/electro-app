using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IOpinionRepository
    {
        Task<OpinionModel> CreateOpinion(OpinionModel opinion);
        Task<OpinionModel> LikeOpinionAsync(Guid  opinionId);
        Task<OpinionModel> DislikeOpinionAsync(Guid opinionId);
    }
}
