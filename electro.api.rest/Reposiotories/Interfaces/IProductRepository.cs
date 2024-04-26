using electro.api.rest.Models;

namespace electro.api.rest.Reposiotories.Interfaces
{
    public interface IProductRepository : IRepository<ProductModel>
    {
        IEnumerable<ProductModel> GetByGroup(int groupId);
    }
}
