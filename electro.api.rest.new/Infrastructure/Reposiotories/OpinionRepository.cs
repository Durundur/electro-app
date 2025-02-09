using Domain.Reposiotories;
using Infrastructure.Context;

namespace Infrastructure.Reposiotories
{
    public class OpinionRepository: IOpinionRepository
    {
        protected readonly ApplicationDbContext _context;

        public OpinionRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
