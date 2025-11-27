using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace PetMap.Services.Auth
{
   public static class AuthConfigService
    {
        public static IServiceCollection AuthService(this IServiceCollection services) 
        {
            services.AddAuthentication(options =>
							{
								options.DefaultAuthenticateScheme = "BasicAuthentication";
								options.DefaultChallengeScheme = "BasicAuthentication";
							}
            )
            .AddBearerToken(options =>
							{
									
							}
            );
                
            return services;
        }
    }
}