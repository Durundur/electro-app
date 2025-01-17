using Application.Reposiotories;
using Infrastructure.Context;

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

        public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
