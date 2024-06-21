namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IUnitOfWork
    {
        IGroupRepository Groups { get; }

        IProductRepository Products { get; }

        IOpinionRepository Opinions { get; }
        ICartRepository Carts { get; }
        Task CompleteAsync();
    }
}
