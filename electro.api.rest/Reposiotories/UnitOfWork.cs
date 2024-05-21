using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;

namespace electro.api.rest.Reposiotories
{
    public class UnitOfWork: IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext _context;
        public IGroupRepository Groups { get; private set; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Groups = new GroupRepository(_context);
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
