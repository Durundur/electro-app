using Application.Reposiotories;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore.Storage;

namespace Infrastructure.Reposiotories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        private IAttributeDefinitionRepository _attributeDefinitionRepository;
        private ICartRepository _cartRepository;
        private IOpinionRepository _opinionRepository;
        private IOrderRepository _orderRepository;
        private IProductHierarchyRepository _productHierarchyRepository;
        private IProductRepository _productRepository;
        private IRecipientRepository _recipientRepository;
        private IUserProfileRepository _userProfileRepository;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public IAttributeDefinitionRepository AttributeDefinitionRepository =>
            _attributeDefinitionRepository ??= new AttributeDefinitionRepository(_context);

        public ICartRepository CartRepository =>
            _cartRepository ??= new CartRepository(_context);

        public IOpinionRepository OpinionRepository =>
            _opinionRepository;

        public IOrderRepository OrderRepository =>
            _orderRepository ??= new OrderRepository(_context);

        public IProductHierarchyRepository ProductHierarchyRepository =>
            _productHierarchyRepository ??= new ProductHierarchyRepository(_context);

        public IProductRepository ProductRepository =>
            _productRepository ??= new ProductRepository(_context);

        public IRecipientRepository RecipientRepository =>
            _recipientRepository ??= new RecipientRepository(_context);

        public IUserProfileRepository UserProfileRepository => 
            _userProfileRepository ??= new UserProfileRepository(_context);

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Database.BeginTransactionAsync(cancellationToken);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
