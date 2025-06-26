using DigitalCampus.Domain.Configuration;
using DigitalCampus.Domain.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using System.Configuration;

namespace DigitalCampus.Infrastructure.App_Start
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection ConfigureInfrastructureServices(this IServiceCollection services,
            IConfiguration configuration)
        {

            return services
                .ConfigureAuthProvider(configuration);

        }

        private static IServiceCollection ConfigureAuthProvider(this IServiceCollection services, IConfiguration configuration)
        {
            var authProvider = configuration.GetSection(Provider.sectionName).Get<Provider>()
                ?? throw new ConfigurationErrorsException("Auth provider configuration is missing");

            if (authProvider.Type!=null)
            {
                // Internal 
                if (authProvider.Type.ToLower() == AppConstants.Internal.ToLower())
                {
                    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.Authority = $"https://login.microsoftonline.com/{configuration["AzureAD:TenantId"]}/v2.0";
                        options.Audience = configuration["AzureAD:ClientId"];
                    });
                }
                // External
                else if (authProvider.Type.ToLower() == AppConstants.External.ToLower())
                {
                    var authSettings = configuration.GetSection(AzureAD.sectionName).Get<AzureAD>() ??
                        throw new ConfigurationErrorsException("Auth provider configuration is missing");

                    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddMicrosoftIdentityWebApi(options =>
                    {
                        options.Audience= authSettings.ClientId;
                        options.Events= new JwtBearerEvents
                        {
                            OnTokenValidated= async context =>
                            {
                                var clientAppId = context.Principal?.Claims.
                                FirstOrDefault(claims => claims.Type =="azp" || claims.Type == "appid")?.Value;

                                if (!authSettings.AllowedClientApps.Contains(clientAppId))
                                    throw new UnauthorizedAccessException("The Client App is not permitted to access this API");
                                await Task.CompletedTask;
                            }

                        };
                    },
                    options =>
                    {
                        configuration.Bind("AzureAD", options);
                    });
                }
            }

            services.AddAuthorization();
            return services;
        }
    }


}
