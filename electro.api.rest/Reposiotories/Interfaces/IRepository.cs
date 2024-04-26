namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        T GetById(Guid id);
        IEnumerable<T> GetAll();
        T Add(T entity);
        void Delete(Guid id);
        T Update(T entity);
    }
}
