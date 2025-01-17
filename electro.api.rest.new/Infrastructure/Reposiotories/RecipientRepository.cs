using Application.Reposiotories;
using Domain.Aggregates.UserProfileAggregate;
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

        public async Task<IList<Recipient>> GetUserRecipientsAsync(Guid userProfileId, CancellationToken cancellationToken)
        {
            return await _context.Recipients
                .Where(r => r.UserProfileId == userProfileId)
                .ToListAsync(cancellationToken);
        }

        public async Task<Recipient?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Recipients
                .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
        }

        public async Task AddRecipientAsync(Recipient recipient, CancellationToken cancellationToken)
        {
            await _context.Recipients.AddAsync(recipient, cancellationToken);
        }

        public void DeleteRecipient(Recipient recipient)
        {
            _context.Recipients.Remove(recipient);
        }
    }
}
