using Application.Services.UserContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPI.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true)]
    public class AuthorizeOnlyForOwnerOrAdminAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string _routeParameterName;

        public AuthorizeOnlyForOwnerOrAdminAttribute(string routeParameterName = "userId")
        {
            _routeParameterName = routeParameterName;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var userContext = context.HttpContext.RequestServices.GetRequiredService<IUserContext>();

            var authorizationResult = AuthorizeUser(userContext, context);
            if (authorizationResult != null)
            {
                context.Result = authorizationResult;
            }
        }

        private IActionResult? AuthorizeUser(IUserContext userContext, AuthorizationFilterContext context)
        {
            if (!userContext.IsAuthenticated)
            {
                return new UnauthorizedResult();
            }

            if (userContext.IsAdmin)
            {
                return null;
            }

            if (!context.RouteData.Values.TryGetValue(_routeParameterName, out var routeValue))
            {
                return new BadRequestObjectResult(new 
                { 
                    error = $"Route parameter '{_routeParameterName}' not found" 
                });
            }

            if (!Guid.TryParse(routeValue?.ToString(), out var resourceUserId))
            {
                return new BadRequestObjectResult(new 
                { 
                    error = $"Invalid {_routeParameterName} format. Expected GUID." 
                });
            }

            if (userContext.UserId != resourceUserId)
            {
                return new ForbidResult();
            }

            return null;
        }
    }
}
