using DigitalCampus.Repository.App_Start;
using DigitalCampus.Server.Filters;
using DigitalCampus.Services.App_Start;
using Newtonsoft.Json;

namespace DigitalCampus.Server.App_Start
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection ConfigureServerServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddControllers()
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
            });

            services.AddScoped<ValidateUserAttribute>();
            services.ConfigureRepositoryServices(configuration);
            services.ConfigureDigitalServices(configuration);

            return services;

        }
    }
}
