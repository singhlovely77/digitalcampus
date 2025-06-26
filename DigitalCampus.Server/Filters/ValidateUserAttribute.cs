using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Reflection;

namespace DigitalCampus.Server.Filters
{
    public class ValidateUserFilter : IAsyncActionFilter
    {
        private readonly IRepository<User> _userRepository;

        public ValidateUserFilter(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            foreach (var arg in context.ActionArguments.Values)
            {
                if (arg == null) continue;

                var userIdProp = arg.GetType().GetProperty("UserId", BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                if (userIdProp == null) continue;

                var userIdObj = userIdProp.GetValue(arg);
                if (userIdObj == null)
                {
                    context.Result = new BadRequestObjectResult("UserId is required.");
                    return;
                }

                if (!Guid.TryParse(userIdObj.ToString(), out Guid userId))
                {
                    context.Result = new BadRequestObjectResult("Invalid UserId format.");
                    return;
                }

                var userExists = await _userRepository.ExistsAsync(u => u.UserId == userId);
                if (!userExists)
                {
                    context.Result = new UnauthorizedObjectResult("User does not exist.");
                    return;
                }

                break;
            }

            await next();
        }
    }

    public class ValidateUserAttribute : TypeFilterAttribute
    {
        public ValidateUserAttribute() : base(typeof(ValidateUserFilter)) { }
    }

}
