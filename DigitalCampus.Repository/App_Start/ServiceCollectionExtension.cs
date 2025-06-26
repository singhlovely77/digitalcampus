using DigitalCampus.Repository.Context;
using DigitalCampus.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DigitalCampus.Repository.App_Start
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection ConfigureRepositoryServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<DigitalDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAttendanceRepository, AttendanceRepository>();
            services.AddScoped<IDepartmentShiftRepository, DepartmentShiftRepository>();

            return services;

        }
    }
}
