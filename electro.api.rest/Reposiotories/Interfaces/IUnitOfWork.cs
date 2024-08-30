namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IUnitOfWork
    {
        IProductHierarchyRepository ProductHierarchy { get; }
        IProductRepository Products { get; }
        IOpinionRepository Opinions { get; }
        ICartRepository Carts { get; }
        IOrderRepository Orders { get; }
        Task<int> CompleteAsync();
    }
}
