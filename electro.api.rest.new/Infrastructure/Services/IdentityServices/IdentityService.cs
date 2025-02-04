using Application.Services.IdentityService;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services.IdentityServices
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<UserIdentity> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;

        public IdentityService(UserManager<UserIdentity> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<Application.Models.Identity.UserIdentity> FindUserByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return null;

            return new Application.Models.Identity.UserIdentity
            {
                Id = user.Id,
                Email = user.Email,
                RefreshToken = user.RefreshToken,
                RefreshTokenExpiry = user.RefreshTokenExpiry.Value
            };
        }

        public async Task<bool> CheckPasswordAsync(Guid userId, string password)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            return user != null && await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<IList<string>> GetRolesAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            return user == null ? new List<string>() : await _userManager.GetRolesAsync(user);
        }

        public async Task UpdateRefreshTokenAsync(Guid userId, string refreshToken, DateTime refreshTokenExpiry)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return;

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = refreshTokenExpiry;
            await _userManager.UpdateAsync(user);
        }

        public async Task<Application.Models.Identity.UserIdentity> CreateUserAsync(string email, string password, IList<string> roles)
        {
            var user = new UserIdentity
            {
                UserName = email,
                Email = email,
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                return null;
            }

            foreach (var role in roles)
            {
                if (await _roleManager.RoleExistsAsync(role))
                {
                    await _userManager.AddToRoleAsync(user, role);
                }
            }

            return new Application.Models.Identity.UserIdentity
            {
                Id = user.Id,
                Email = user.Email,
            };
        }

        public async Task<Application.Models.Identity.UserIdentity> FindUserByIdAsync(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) return null;

            return new Application.Models.Identity.UserIdentity
            {
                Id = user.Id,
                Email = user.Email,
                RefreshToken = user.RefreshToken,
                RefreshTokenExpiry = user.RefreshTokenExpiry.Value
            };
        }
    }
}
