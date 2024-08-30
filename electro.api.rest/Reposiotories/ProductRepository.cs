using electro.api.rest.Exceptions;
using electro.api.rest.Models;
using electro.api.rest.Models.Product;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IProductHierarchyRepository productHierarchyRepository;

        public ProductRepository(ApplicationDbContext dbContext, IProductHierarchyRepository productHierarchyRepository)
        {
            this.dbContext = dbContext;
            this.productHierarchyRepository = productHierarchyRepository;
        }


        public IQueryable<ProductModel> GetProducts()
        {
            var products = dbContext.Products.AsQueryable();
            return products;
        }

        
        public async Task<ProductModel> GetProductById(string id)
        {
            var product = await dbContext.Products
                .Include(p => p.Group)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .Include(p => p.Specification)
                .FirstOrDefaultAsync(p => p.Id.ToString() == id);
            return product;
        }

        public async Task DeleteProduct(string id)
        {
            var product = await GetProductById(id);
            if (product == null)
            {
                throw new NotFoundException("Product not found");
            }
            await dbContext.Entry(product).Reference(p => p.Specification).LoadAsync();
            await dbContext.Entry(product).Collection(p => p.Opinions).LoadAsync();
            dbContext.ProductsSpecification.Remove(product.Specification);
            dbContext.Products.Remove(product);
            dbContext.Opinions.RemoveRange(product.Opinions);
        }


        public async Task<ProductModel> CreateProduct(ProductModel product)
        {
            if (product.Group != null)
            {
                var group = await productHierarchyRepository.GetGroupById(product.Group.Id);
                if (group.Id != product.Group.Id || group.Name != product.Group.Name)
                {
                    throw new InvalidOperationException("");
                }
                product.Group = group;
            }
            if (product.Category != null)
            {
                var category = await productHierarchyRepository.GetCategoryById(product.Category.Id);
                if (category.Id != product.Category.Id || category.Name != product.Category.Name)
                {
                    throw new InvalidOperationException();
                }
                product.Category = category;
            }
            if (product.SubCategory != null)
            {
                var subCategory = await productHierarchyRepository.GetSubCategoryById(product.SubCategory.Id);
                if (subCategory.Id != product.SubCategory.Id || subCategory.Name != product.SubCategory.Name)
                {
                    throw new InvalidOperationException();
                }
                product.SubCategory = subCategory;
            }
            dbContext.Products.Add(product);
            return product;
        }

        public async Task<ProductModel> UpdateProduct(ProductModel product)
        {
            var existingProduct = await dbContext.Products.Include(p => p.Specification).FirstOrDefaultAsync(p => p.Id == product.Id);
            if(existingProduct == null)
            {
                throw new NotFoundException("Product not found.");
            }
            existingProduct.Name = product.Name;
            existingProduct.Price = product.Price;
            existingProduct.GroupId = product.GroupId;
            existingProduct.CategoryId = product.CategoryId;
            existingProduct.SubCategoryId = product.SubCategoryId;
            existingProduct.Photos = product.Photos;
            existingProduct.Description = product.Description;
            existingProduct.Specification = product.Specification;
            existingProduct.Features = product.Features;
            existingProduct.StockQuantity = product.StockQuantity;
            existingProduct.IsPublished = product.IsPublished;
            existingProduct.IsArchived = product.IsArchived;
            return product;
        }
    }
}
