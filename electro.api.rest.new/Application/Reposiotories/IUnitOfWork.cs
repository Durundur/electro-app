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
        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
