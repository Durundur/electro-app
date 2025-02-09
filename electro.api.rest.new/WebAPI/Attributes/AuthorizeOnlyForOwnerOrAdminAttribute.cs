using Application.Services.UserContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPI.Attributes
{
    public class AuthorizeOnlyForOwnerOrAdminAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var userContext = context.HttpContext.RequestServices.GetService<IUserContext>();

            if (userContext == null || !context.RouteData.Values.TryGetValue("userId", out var userIdObj) || userIdObj == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            if (!Guid.TryParse(userIdObj.ToString(), out var userId) || (userContext.UserId != userId && !userContext.IsAdmin))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
