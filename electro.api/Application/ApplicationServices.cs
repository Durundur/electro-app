using Application.Services.AuthService;
using Application.Services.CartService;
using Application.Services.OpinionService;
using Application.Services.OrderService;
using Application.Services.ProductHierarchyService;
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
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IProductHierarchyService, ProductHierarchyService>();

            return services;
        }
    }
}
