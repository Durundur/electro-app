using Application.Services.IdentityService;
using Domain.Aggregates.UserAggregate;
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

        public async Task<IUser> FindUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<IUser> FindUserByIdAsync(Guid id)
        {
            return await _userManager.FindByIdAsync(id.ToString());
        }

        public async Task<bool> CheckPasswordAsync(Guid userId, string password)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return false;
            }

            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<IList<string>> GetRolesAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            return await _userManager.GetRolesAsync(user);
        }

        public async Task UpdateRefreshTokenAsync(Guid userId, string refreshToken, DateTime refreshTokenExpiry)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = refreshTokenExpiry;
            await _userManager.UpdateAsync(user);
        }

        public async Task<IUser> CreateUserAsync(string email, string password, IList<string> roles)
        {
            var existingUser = await _userManager.FindByEmailAsync(email);
            if (existingUser != null)
            {
                throw new Exception("User with this email already exists.");
            }

            var user = new UserIdentity
            {
                UserName = email,
                Email = email,
                RefreshToken = null,
                RefreshTokenExpiry = DateTime.MinValue
            };

            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                throw new Exception("User creation failed: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            foreach (var role in roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    throw new Exception($"Role '{role}' does not exist.");
                }

                await _userManager.AddToRoleAsync(user, role);
            }

            return user;
        }
    }
}
