using Domain.Reposiotories;
using Domain.Aggregates.UserAggregate;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Reposiotories
{
    public class RecipientRepository : IRecipientRepository
    {
        protected readonly ApplicationDbContext _context;

        public RecipientRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Recipient>> GetUserRecipientsAsync(Guid userId, CancellationToken cancellationToken)
        {
            return await _context.Recipients
                .Where(r => r.UserId == userId)
                .ToListAsync(cancellationToken);
        }

        public async Task<Recipient?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Recipients
                .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
        }

        public async Task<Recipient> AddRecipientAsync(Recipient recipient, CancellationToken cancellationToken)
        {
            var entry = await _context.Recipients.AddAsync(recipient, cancellationToken);
            return entry.Entity;
        }

        public async Task DeleteRecipientAsync(Guid recipientId, CancellationToken cancellationToken)
        {
            var recipient = await _context.Recipients.FirstOrDefaultAsync(r => r.Id == recipientId, cancellationToken);
            if (recipient != null)
            {
                _context.Recipients.Remove(recipient);
            }
        }
    }
}
