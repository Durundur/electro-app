using Domain.Reposiotories;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore.Storage;

namespace Infrastructure.Reposiotories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IDbContextTransaction _transaction;

        private IAttributeDefinitionRepository _attributeDefinitionRepository;
        private ICartRepository _cartRepository;
        private IOpinionRepository _opinionRepository;
        private IOrderRepository _orderRepository;
        private IProductHierarchyRepository _productHierarchyRepository;
        private IProductRepository _productRepository;
        private IRecipientRepository _recipientRepository;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public IAttributeDefinitionRepository AttributeDefinitionRepository =>
            _attributeDefinitionRepository ??= new AttributeDefinitionRepository(_context);

        public ICartRepository CartRepository =>
            _cartRepository ??= new CartRepository(_context);

        public IOpinionRepository OpinionRepository =>
            _opinionRepository ??= new OpinionRepository(_context);

        public IOrderRepository OrderRepository =>
            _orderRepository ??= new OrderRepository(_context);

        public IProductHierarchyRepository ProductHierarchyRepository =>
            _productHierarchyRepository ??= new ProductHierarchyRepository(_context);

        public IProductRepository ProductRepository =>
            _productRepository ??= new ProductRepository(_context);

        public IRecipientRepository RecipientRepository =>
            _recipientRepository ??= new RecipientRepository(_context);

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
        {
            _transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        }

        public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
        {
            if (_transaction == null)
            {
                throw new InvalidOperationException("Transaction not started.");
            }

            await _transaction.CommitAsync(cancellationToken);
            await _transaction.DisposeAsync();
            _transaction = null;
        }

        public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
        {
            if (_transaction == null)
            {
                throw new InvalidOperationException("Transaction not started.");
            }

            await _transaction.RollbackAsync(cancellationToken);
            await _transaction.DisposeAsync();
            _transaction = null;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}