using electro.api.rest.Dtos;
using electro.api.rest.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace electro.api.rest.ActionFilters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var errorResponse = new ErrorResponse(context.Exception.Message);

            if (context.Exception.GetType() == typeof(InvalidOperationException))
            {
                context.Result = new BadRequestObjectResult(errorResponse);
            }

            if (context.Exception.GetType() == typeof(NotFoundException))
            {
                context.Result = new NotFoundObjectResult(errorResponse);
            }
        }
    }
}
