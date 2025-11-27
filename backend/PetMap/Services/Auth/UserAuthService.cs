using Microsoft.AspNetCore.Identity;
using PetMap.Context;
using PetMap.Models;

namespace PetMap.Services.Auth
 {
	public static class UserAuthService
	{
		public static IServiceCollection AuthService(this IServiceCollection services)
		{
			services.AddAuthorization();
			services.AddAuthentication()
				.AddCookie();
			services.AddIdentityCore<User>(options =>
			{
				options.Password.RequireDigit = true;
				options.Password.RequireLowercase = true;
				options.Password.RequireUppercase = false;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequiredLength = 6;
				options.User.RequireUniqueEmail = true;

				options.SignIn.RequireConfirmedEmail = true;
				
			})
				.AddApiEndpoints()
				.AddRoles<Role>()
				.AddDefaultTokenProviders()
				.AddEntityFrameworkStores<PetMapDbContext>();
			return services;
		}
	}
}