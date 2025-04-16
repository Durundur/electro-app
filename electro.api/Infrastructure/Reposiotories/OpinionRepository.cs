using Domain.Aggregates.ProductCatalogAggregate;
using Domain.Reposiotories;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Reposiotories
{
    public class OpinionRepository : IOpinionRepository
    {
        protected readonly ApplicationDbContext _context;

        public OpinionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IQueryable<Opinion> GetOpinionsQuery()
        {
            return _context.Opinions
                .Include(o => o.Reactions)
                .AsQueryable();
        }

        public async Task<Opinion> AddOpinionAsync(Opinion opinion, CancellationToken cancellationToken)
        {
            var entry = await _context.Opinions.AddAsync(opinion, cancellationToken);
            return entry.Entity;
        }

        public async Task<Opinion> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var opinion = await GetOpinionsQuery().FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
            return opinion;
        }
    }
}
