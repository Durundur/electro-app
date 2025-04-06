using System.Data;

namespace Domain.Reposiotories
{
    public interface IUnitOfWork : IDisposable
    {
        IAttributeDefinitionRepository AttributeDefinitionRepository { get; }
        ICartRepository CartRepository { get; }
        IOpinionRepository OpinionRepository { get; }
        IOrderRepository OrderRepository { get; }
        IProductHierarchyRepository ProductHierarchyRepository { get; }
        IProductRepository ProductRepository { get; }
        IRecipientRepository RecipientRepository { get; }
        IProductPromotionRepository ProductPromotionRepository { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        Task CommitTransactionAsync(CancellationToken cancellationToken = default);
        Task RollbackTransactionAsync(CancellationToken cancellationToken = default);
        Task BeginTransactionAsync(IsolationLevel isolationLevel = IsolationLevel.RepeatableRead, CancellationToken cancellationToken = default);
    }
}
