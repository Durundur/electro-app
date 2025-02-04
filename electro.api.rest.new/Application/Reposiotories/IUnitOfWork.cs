using Microsoft.EntityFrameworkCore.Storage;

namespace Application.Reposiotories
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
        IUserProfileRepository UserProfileRepository { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default);
    }
}
