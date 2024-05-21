namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IUnitOfWork
    {
        IGroupRepository Groups { get; }
        Task CompleteAsync();
    }
}
