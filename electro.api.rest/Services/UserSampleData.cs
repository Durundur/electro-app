using electro.api.rest.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;
using System.Data;
using Microsoft.AspNetCore.Authentication;
using electro.api.rest.Models.Auth;

namespace electro.api.rest.Services
{
    public static class UserSampleData
    {
        public static async Task SeedUsers(IServiceProvider service)
        {
            using (var scope = service.CreateScope())
            {
                var cntx = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserModel>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleModel>>();
                if (!await cntx.Database.EnsureCreatedAsync())
                {
                    var adminRole = new RoleModel("Admin");
                    var userRole = new RoleModel("User");

                    await roleManager.CreateAsync(adminRole);
                    await roleManager.CreateAsync(userRole);
                    var adminUser = new UserModel() { UserName = "admin", Email = "admin@test.com", FirstName = "admin", LastName = "admin" };
                    var user = new UserModel() { UserName = "user", Email = "user@test.com", FirstName = "user", LastName = "user" };
                    await userManager.CreateAsync(adminUser, "123");
                    await userManager.CreateAsync(user, "123");
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                    await userManager.AddToRoleAsync(user, "User");
                }
            }
        }
    }
}
