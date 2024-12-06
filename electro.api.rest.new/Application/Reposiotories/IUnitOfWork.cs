namespace Application.Reposiotories
{
    public interface IUnitOfWork : IDisposable
    {
        IProductHierarchyRepository ProductHierarchy { get; }
        IProductRepository Products { get; }
        IOpinionRepository Opinions { get; }
        ICartRepository Carts { get; }
        IOrderRepository Orders { get; }

        Task<int> CompleteAsync();
    }
}
