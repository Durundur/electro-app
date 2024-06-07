using Microsoft.AspNetCore.Identity;

namespace electro.api.rest.Models
{
    public class RoleModel: IdentityRole<Guid>
    {
        public RoleModel() : base() { }
        public RoleModel(string roleName) : base(roleName) { }
    }
}
