using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Rest.Application
{
    public static class RestApplicationServices
    {
        public static IServiceCollection AddRestApplicationServices(this IServiceCollection services)
        {
            services.AddMediator();
            return services;
        }
       
        private static void AddMediator(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        }
    }
}
