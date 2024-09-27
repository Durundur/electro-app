using electro.api.rest.DTOs.Opinion;
using electro.api.rest.Exceptions;
using electro.api.rest.Models;
using electro.api.rest.Models.Opinion;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace electro.api.rest.Repositories
{
    public class OpinionRepository : IOpinionRepository
    {
        private readonly ApplicationDbContext dbContext;

        public OpinionRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<OpinionModel> CreateOpinionAsync(OpinionModel opinion)
        {
            var product = await dbContext.Products.FirstOrDefaultAsync(p => p.Id == opinion.ProductId);
            if (product == null)
            {
                throw new NotFoundException("Product not found");
            }
            product.OpinionsCount++;
            product.AverageOpinionsRating = (float)Math.Round(((product.AverageOpinionsRating * (product.OpinionsCount - 1)) + opinion.Rating) / product.OpinionsCount, 2);
            opinion.Product = product;
            dbContext.Opinions.Add(opinion);
            return opinion;
        }


        public async Task<OpinionModel> RateOpinionAsync(Guid opinionId, Guid userId, OpinionActionType actionType)
        {
            var opinion = await dbContext.Opinions
                .Include(o => o.OpinionsActions)
                .FirstOrDefaultAsync(o => o.Id == opinionId) ?? throw new NotFoundException("Opinion not found");

            var action = opinion.OpinionsActions.FirstOrDefault(a => a.UserId == userId);
            if (action == null)
            {
                action = new OpinionActionModel()
                {
                    ActionType = actionType,
                    UserId = userId,
                    Opinion = opinion
                };
                if (actionType == OpinionActionType.Like)
                {
                    opinion.Likes++;
                }
                else if (actionType == OpinionActionType.Dislike)
                {
                    opinion.Dislikes++;
                }

                dbContext.OpinionsActions.Add(action);
            }
            else
            {
                if (action.ActionType == OpinionActionType.Like && actionType == OpinionActionType.Dislike)
                {
                    opinion.Likes--;
                    opinion.Dislikes++;
                }
                else if (action.ActionType == OpinionActionType.Dislike && actionType == OpinionActionType.Like)
                {
                    opinion.Dislikes--;
                    opinion.Likes++;
                }
                action.ActionType = actionType;
                dbContext.OpinionsActions.Update(action);
            }
            return opinion;
        }

        public IQueryable<OpinionModel> GetOpinions(Guid productId)
        {
            var opinons = dbContext.Opinions.Include(o => o.OpinionsActions).Where(o => o.ProductId == productId).AsQueryable();
            return opinons;
        }

        public async Task<IEnumerable<OpinionsStats>> GetOpinionsStatsAsync(Guid productId)
        {
            var opinions = await dbContext.Opinions.Where(o => o.ProductId == productId).ToListAsync();
            var stats = new List<OpinionsStats>()
            {
                new OpinionsStats(1),
                new OpinionsStats(2),
                new OpinionsStats(3),
                new OpinionsStats(4),
                new OpinionsStats(5)
            };
            foreach (var opinion in opinions)
            {
                int rating = (int)Math.Ceiling(opinion.Rating);
                if (rating >= 1 && rating <= 5)
                {
                    stats[rating - 1].Count++;
                }
            }
            return stats;
        }
    }
}
