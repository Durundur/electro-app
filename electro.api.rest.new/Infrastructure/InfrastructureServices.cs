using Application.Reposiotories;
using Infrastructure.Context;
using Infrastructure.Reposiotories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class InfrastructureServices
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbService(configuration);
            services.AddRepositories();
            return services;
        }

        private static void AddDbService(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DB");
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });
        }

        private static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IProductHierarchyRepository, ProductHierarchyRepository>();
            services.AddScoped<IAttributeDefinitionRepository,  AttributeDefinitionRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<IRecipientRepository, RecipientRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}
