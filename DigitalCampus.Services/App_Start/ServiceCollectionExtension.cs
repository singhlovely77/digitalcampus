using DigitalCampus.Services.Interfaces;
using DigitalCampus.Services.Modules.UserManagement;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DigitalCampus.Services.App_Start
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection ConfigureDigitalServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IDepartmentService, DepartmentService>();
            services.AddTransient<IUserScheduleService, UserScheduleService>();
            services.AddTransient<ICommonService, CommonService>();
            services.AddTransient<IAttendanceService, AttendanceService>();

            return services;

        }
    }
}
