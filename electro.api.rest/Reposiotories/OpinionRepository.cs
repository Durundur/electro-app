﻿using electro.api.rest.Dtos;
using electro.api.rest.Exceptions;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace electro.api.rest.Repositories
{
    public class OpinionRepository : IOpinionRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public OpinionRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<OpinionModel> CreateOpinionAsync(OpinionModel opinion)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == opinion.ProductId);
            if (product == null)
            {
                throw new NotFoundException("Product not found");
            }
            product.OpinionsCount++;
            product.AvgOpinionsRating += opinion.Rating / 2;
            opinion.Product = product;
            _dbContext.Opinions.Add(opinion);
            return opinion;
        }


        public async Task<OpinionModel> RateOpinionAsync(Guid opinionId, Guid userId, OpinionActionType actionType)
        {
            var opinion = await _dbContext.Opinions
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

                _dbContext.OpinionsActions.Add(action);
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
                _dbContext.OpinionsActions.Update(action);
            }
            return opinion;
        }

        public async Task<IEnumerable<OpinionModel>> GetOpinionsByRatingAsync(Guid productId, int rating)
        {
            var opinons = await _dbContext.Opinions.Include(o => o.OpinionsActions).Where(o => o.ProductId == productId && Math.Ceiling(o.Rating) == rating).ToListAsync();
            return opinons;
        }

        public async Task<IEnumerable<OpinionsStats>> GetOpinionsStatsAsync(Guid productId)
        {
            var opinions = await _dbContext.Opinions.Where(o => o.ProductId == productId).ToListAsync();
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
