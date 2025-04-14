using Application.Services.ProductService;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class ApplicationServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<IProductService, ProductService>();
            return services;
        }
    }
}
