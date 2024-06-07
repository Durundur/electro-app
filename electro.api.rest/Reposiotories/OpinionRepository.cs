using electro.api.rest.Exceptions;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace electro.api.rest.Repositories
{
    public class OpinionRepository: IOpinionRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public OpinionRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<OpinionModel> CreateOpinion(OpinionModel opinion)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == opinion.ProductId);
            if (product == null)
            {
                throw new NotFoundException("Product not found");
            }
            opinion.Product = product;
            _dbContext.Opinions.Add(opinion);
            return opinion;
        }

        public async Task<OpinionModel> LikeOpinionAsync(Guid opinionId)
        {
            var opinion = await _dbContext.Opinions.FirstOrDefaultAsync(o => o.Id == opinionId);
            if (opinion == null)
            {
                throw new NotFoundException("Opinion not found");
            }
            opinion.Likes++;
            return opinion;
        }

        public async Task<OpinionModel> DislikeOpinionAsync(Guid opinionId)
        {
            var opinion = await _dbContext.Opinions.FirstOrDefaultAsync(o => o.Id == opinionId);
            if (opinion == null)
            {
                throw new NotFoundException("Opinion not found");
            }
            opinion.Dislikes++;
            return opinion;
        }

    }
}
