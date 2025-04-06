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

        public IQueryable<Opinion> GetProductOpinionsQuery(Guid productId)
        {
            return _context.Opinions
                .Include(o => o.Reactions)
                .Where(o => EF.Property<Guid>(o, "ProductId") == productId)
                .AsQueryable();
        }

        public async Task<Opinion> AddOpinionAsync(Opinion opinion, CancellationToken cancellationToken)
        {
            var entry = await _context.Opinions.AddAsync(opinion, cancellationToken);
            return entry.Entity;
        }

        public Task<Opinion> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return _context.Opinions.Include(o => o.Reactions).FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
        }
    }
}
