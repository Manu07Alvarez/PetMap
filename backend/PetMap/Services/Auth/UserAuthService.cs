using Microsoft.AspNetCore.Authentication;

namespace PetMap.Services.Auth
 {
		public static class UserAuthService
		 {
				 public static AuthenticationHandler< AuthService(this IServiceCollection services) 
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