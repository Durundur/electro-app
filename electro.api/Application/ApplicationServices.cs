using Application.Services.OpinionService;
using Application.Services.OrderService;
using Application.Services.ProductService;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class ApplicationServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IOpinionService, OpinionService>();

            return services;
        }
    }
}
